import { defineStore } from 'pinia'
import { UserPayloadInterface, User } from 'types'
// import { useToast } from 'tailvue'
import Api from '~/services/api'

// const $toast = useToast()
// const { $toast } = useNuxtApp()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    isLoading: false,
    isLoadingLocal: false,
    errors: {},
    error: '',
    success: false,
    user: null,
  }),
  actions: {
    async authenticateUser(payload: UserPayloadInterface) {
      this.isLoading = true
      // $toast.show('this is a test')
      // useFetch from nuxt 3
      // const { data, pending }: any = await useFetch(
      //   `http://localhost:8000/api/v1/users/login`,
      //   {
      //     method: 'post',
      //     headers: { 'Content-Type': 'application/json' },
      //     // mode: 'no-cors',
      //     body: {
      //       email,
      //       password,
      //     },
      //   },
      // )
      const { data, pending, error }: any = await Api.post(
        '/users/login',
        payload,
      )
      this.isLoading = pending.value

      if (data.value && data.value.status === 'success') {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.isAuthenticated = true // set isAuthenticated  state value to true
        this.user = data.value.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        this.success = true
      }
      // if (error.value) this.errors = error.value
      // if (!data.value) throw new Error('Something went wrong!')
      if (error.value) {
        // this.error = 'Password or email incorrect!'
        this.error = error.value.data.message
        setTimeout(() => {
          this.error = ''
        }, 3500)
      }
    },
    async logUserOut() {
      // const { data, pending }: any = await useFetch(
      //   `http://localhost:8000/api/v1/users/logout`,
      //   {
      //     method: 'get',
      //     headers: { 'Content-Type': 'application/json' },
      //   },
      // )
      const { data, pending, error }: any = await Api.get('/users/logout')
      this.isLoading = pending

      console.log('this.isLoading', this.isLoading)
      console.log('data.value', data.value)

      if (data.value) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        this.isAuthenticated = false // set isAuthenticated  state value to false
        token.value = null // clear the token cookie
        this.isAuthenticated = false
        this.user = null
        localStorage.removeItem('user')
        // this.success = true
      }
    },
    async signUp(payload: any) {
      this.isLoading = true
      // $toast.show('this is a test')
      // useFetch from nuxt 3
      // const { data, pending, error, refresh }: any = await useFetch(
      //   `${BASE_URL}/users/signup`,
      //   {
      //     method: 'post',
      //     headers: { 'Content-Type': 'application/json' },
      //     // mode: 'no-cors',
      //     body: {
      //       email,
      //       password,
      //     },
      //   },
      // )
      const { data, pending, error, refresh }: any = await Api.post(
        '/users/signup',
        payload,
      )
      this.isLoading = pending

      // console.log('this.isLoading', this.isLoading)
      // console.log('data.value', data.value)

      if (data.value) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.isAuthenticated = true // set isAuthenticated  state value to true
        this.user = data.value.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        this.success = true
      }

      // if (!data.value) throw new Error('Something went wrong!')

      console.log('data.value', data.value)
      console.log('pending.value', pending.value)
      console.log('error.value', error.value)
      console.log('refresh.value', refresh.value)

      if (error.value) {
        console.log('error.value.data', error.value.data)
        this.errors = error.value.data.error.errors
        // throw new Error(error.value.data.message)
      }
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
    async updatePassword(payload) {
      this.isLoadingLocal = true
      const { data, pending, error }: any = await Api.post(
        '/users/updateMyPassword',
        payload,
      )
      console.log('data, pending, error ')
      this.isLoadingLocal = pending.value
    },
    async updateUserData(payload) {
      this.isLoading = true
      const { data, pending, error }: any = await Api.post(
        '/users/updateMe',
        payload,
      )
      console.log('data, pending, error ')
      this.isLoading = pending.value
    },
  },
})
