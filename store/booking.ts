import { defineStore } from 'pinia'
// import { UserPayloadInterface } from 'types'
// import { useToast } from 'tailvue'

// const $toast = useToast()
// const { $toast } = useNuxtApp()

// const baseURL = useRuntimeConfig().public.baseURL
const BASE_URL = 'http://localhost:8000/api/v1'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    checkoutSession: null,
    isLoading: false,
    errors: [],
    success: false,
    user: null,
  }),
  actions: {
    async getCheckoutSession(payload: string) {
      // Call the composable to get the Stripe instance
      const stripe = await useClientStripe()

      // $toast.show('this is a test')
      // useFetch from nuxt 3
      const token = useCookie('token')
      const { data, pending }: any = await useFetch(
        `${BASE_URL}/bookings/checkout-session/${payload}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
        },
      )
      this.isLoading = pending

      console.log('this.isLoading', this.isLoading)
      console.log('data.value', data.value)

      if (data.value.status === 'success') {
        this.success = true
        this.checkoutSession = data.value

        // Use the Stripe instance to interact with the stripe.js library
        // stripe.redirectToCheckout(...)

        await stripe.redirectToCheckout({
          sessionId: data.value.session.id,
        })
      }

      console.log('data', data)

      if (!data.value) throw new Error('Something went wrong!')
    },
    async createBooking({ subscription, user, price }: any) {
      console.log('subscription, user, price', subscription, user, price)
      // $toast.show('this is a test')
      // useFetch from nuxt 3
      const token = useCookie('token')
      const { data, pending }: any = await useFetch(
        `${BASE_URL}/bookings/checkout-payment`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          body: {
            subscription,
            user,
            price,
          },
        },
      )
      this.isLoading = pending

      console.log('this.isLoading', this.isLoading)
      console.log('data.value', data.value)

      if (data.value.status === 'success') {
        this.success = true
      }

      console.log('data', data)

      if (!data.value) throw new Error('Something went wrong!')
    },
  },
})
