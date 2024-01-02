import { defineStore } from 'pinia'
import type { UserPayloadInterface, IAuthStore, IUser } from '@/types'
import Api from '~/services/api'

import { clearObject } from '@/utils/utils'

const defaultUserValue: IUser = {
  createdAt: '',
  email: '',
  name: '',
  photo: null,
  role: '',
  updatedAt: '',
  id: '',
  position: '',
}

const defalutAuthValue: IAuthStore = {
  isAuthenticated: false,
  isLoading: false,
  isLoadingLocal: false,
  errors: {},
  error: '',
  success: false,
  user: defaultUserValue,
}

export const useAuthStore = defineStore('auth', {
  state: () => defalutAuthValue,
  actions: {
    async authenticateUser(payload: UserPayloadInterface) {
      this.isLoading = true
      this.clearErrors(true)
      const { data, pending, error }: any = await Api.post(
        '/users/login',
        payload,
      )
      this.isLoading = pending.value

      if (data.value && data.value.status === 'success') {
        this.showToaster('Success', 'Successfully logged in!')
        this.setCookieToken(data?.value?.token)
        this.isAuthenticated = true // set isAuthenticated  state value to true
        this.user = data.value.data.user
        this.setLocalStorage(data.value.data.user)
        this.success = true
      }

      if (error.value) {
        console.error(error.value)
        this.error = error.value.data.message
        this.showToaster('Error', this.error, true)
        setTimeout(() => {
          this.error = ''
        }, 3500)
      }

      this.clearErrors()
    },
    async logUserOut() {
      const { data, pending, error }: any = await Api.get('/users/logout')
      this.isLoading = pending

      if (data.value) {
        this.clearCookieToken()
        this.clear()
        this.clearLocalStorage()
      }

      if (error) console.error(error)
    },
    async signUp(payload: any) {
      const { $toaster } = useNuxtApp()
      this.isLoading = true
      this.clearErrors(true)
      const { data, pending, error, refresh }: any = await Api.post(
        '/users/signup',
        payload,
      )
      this.isLoading = pending.value
      if (data.value) {
        if (data.value.data && data.value.data.user) {
          const token = useCookie('token') // useCookie new hook in nuxt 3
          token.value = data?.value?.token // set token to cookie
          this.isAuthenticated = true // set isAuthenticated  state value to true
          this.user = data.value.data.user
          localStorage.setItem('user', JSON.stringify(this.user))
        }

        this.success = true
        $toaster.info({
          title: 'Success',
          message: 'Please check your email.',
        })
      }

      // if (!data.value) throw new Error('Something went wrong!')

      // console.log('data.value', data.value)
      // console.log('pending.value', pending.value)
      // console.log('error.value', error.value)
      // console.log('refresh.value', refresh.value)

      if (error.value) {
        console.log('error.value.data', error.value.data)
        if (error.value.data.message) {
          this.error = error.value.data.message
          $toaster.error({
            title: 'Error',
            message: this.error,
          })
        }
        // PROD
        if (error.value.data.errors) {
          for (const [key, value] of Object.entries(error.value.data.errors)) {
            this.errors = Object.assign(this.errors, value)
          }
        }
        // DEV
        if (error.value.data && error.value.data.error) {
          for (const [key, value] of Object.entries(
            error.value.data.error.errors,
          )) {
            this.errors = Object.assign(this.errors, {
              [value.path]: value.message,
            })
          }
        }
        // throw new Error(error.value.data.message)
      }

      this.clearErrors()
    },
    async passwordConfirm(payload: UserPayloadInterface) {
      // $toast.show('this is a test')
      // useFetch from nuxt 3
      // const { data, pending, error, refresh }: any = await useFetch(
      //   `${BASE_URL}/users/password-confirm/${payload}`,
      //   {
      //     method: 'get',
      //     headers: { 'Content-Type': 'application/json' },
      //   },
      // )
      const { data, pending, error }: any = await Api.get(
        `/users/password-confirm/${payload}`,
      )
      console.log('data.value', data.value)
      console.log('pending.value', pending.value)
      console.log('error.value', error.value)
      // console.log('refresh.value', refresh.value)
    },
    async updatePassword(payload: Object) {
      this.isLoadingLocal = true
      const { data, pending, error }: any = await Api.post(
        '/users/updateMyPassword',
        payload,
      )
      console.log(data, pending, error)
      this.isLoadingLocal = pending.value
    },
    async updateUserData(payload: Object) {
      this.isLoading = true
      const { data, pending, error }: any = await Api.post(
        '/users/updateMe',
        payload,
      )
      console.log(data, pending, error)
      this.isLoading = pending.value
    },
    clearErrors(all: boolean = false) {
      if (all) this.errors = clearObject(this.errors)
      // const runtimeConfig = useRuntimeConfig()
      setTimeout(() => {
        this.error = ''
      }, 3500)
    },
    async emailConfirm(payload: string) {
      const { data, pending, error }: any = await Api.post(
        `/users/emailConfirm/${payload}`,
      )
      console.log('data.value', data.value)
      console.log('pending.value', pending.value)
      console.log('error.value', error.value)
      // console.log('refresh.value', refresh.value)
      if (data.value && data.value.status === 'success') {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.isAuthenticated = true // set isAuthenticated  state value to true
        this.user = data.value.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        this.success = true
      }

      // if (error.value) {
      //   console.log('error.value.data', error.value.data)
      // }
    },
    clear() {
      this.$patch(defalutAuthValue)
    },
    set(input: IUser) {
      this.$patch({ user: input })
    },
    setLocalStorage(input: IUser) {
      localStorage.setItem('user', JSON.stringify(input))
    },
    clearLocalStorage() {
      localStorage.removeItem('user')
    },
    setCookieToken(input: string) {
      const token = useCookie('token') // useCookie new hook in nuxt 3
      token.value = input // set token to cookie
    },
    clearCookieToken() {
      const token = useCookie('token')
      token.value = null
    },
    showToaster(title: string, message: string, error?: boolean) {
      const { $toaster } = useNuxtApp()
      if (error) {
        $toaster.error({
          title,
          message,
        })
        return
      }
      $toaster.info({
        title,
        message,
      })
    },
  },
  getters: {
    isAuth: (state) => state.isAuthenticated,
  },
})
