import { defineStore } from 'pinia'
import { UserPayloadInterface } from 'types'
// import { useToast } from 'tailvue'
import Api from '~/services/api'

import { useMyFetch } from '@/composables/useMyFetch'

// const $toast = useToast()
// const { $toast } = useNuxtApp()

// const baseURL = useRuntimeConfig().public.baseURL
const BASE_URL = 'http://localhost:8000/api/v1'

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    subscriptions: null,
    mySubscription: null,
    isloading: false,
    errors: [],
    success: false,
    user: null,
  }),
  actions: {
    async getSubscriptions() {
      this.isloading = true
      const { data, pending }: any = await Api.get('/subscriptions')
      if (data.value) this.subscriptions = data.value.data.data
      this.isloading = false
    },
    // async getSubscriptions() {
    //   // $toast.show('this is a test')
    //   // useFetch from nuxt 3
    //   const token = useCookie('token')
    //   const { data, pending }: any = await useFetch(
    //     `${BASE_URL}/subscriptions`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         Authorization: `Bearer ${token.value}`,
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   this.isloading = pending

    //   console.log('this.isloading', this.isloading)
    //   console.log('data.value', data.value)

    //   if (data.value && data.value.status === 'success') {
    //     this.success = true
    //     this.subscriptions = data.value.data.data
    //   }

    //   console.log('data', data)

    //   if (!data.value) throw new Error('Something went wrong!')
    // },
    async getMySubscriptions() {
      // $toast.show('this is a test')
      // useFetch from nuxt 3
      const token = useCookie('token')
      const { data, pending }: any = await useFetch(
        `${BASE_URL}/subscriptions/my-subscription`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
        },
      )
      this.isloading = pending

      console.log('this.isloading', this.isloading)
      console.log('data.value', data.value)

      if (data.value.status === 'success') {
        this.success = true
        this.mySubscription = data.value.data.data
      }

      console.log('data', data)

      if (!data.value) throw new Error('Something went wrong!')
    },
  },
})
