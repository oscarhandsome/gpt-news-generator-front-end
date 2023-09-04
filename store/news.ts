import { defineStore } from 'pinia'
import Api from '~/services/api'

interface NewsPayloadInterface {
  name: string
  type: string
  famousPerson: string
  place: string
  length: number
  checkboxPublic: boolean
  checkboxActive: boolean
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
    currentNews: {},
    isloading: false,
    errors: {},
    success: null,
  }),
  actions: {
    async getAllNews() {
      this.news = await Api.get('/news')
    },
    // async getAllNews() {
    //   this.isloading = true
    //   this.errors = []
    //   this.errors = {}
    //   // console.log('payload', payload)

    //   // for (const [key, value] of Object.entries(payload)) {
    //   //   if (!value) this.errors[key] = `${key} not exist`
    //   // }

    //   // useFetch from nuxt 3
    //   const { data, pending }: any = await useFetch(
    //     'http://localhost:8000/api/v1/news',
    //     {
    //       method: 'get',
    //       headers: { 'Content-Type': 'application/json' },
    //       // body: payload,
    //     },
    //   ).catch((error) => console.error('error', error))
    //   // this.isloading = pending
    //   // console.log('pending', pending)
    //   console.log('data', data.value)

    //   if (data) this.news = data.value.data.data

    //   this.isloading = false
    // },
    async createNews(payload: NewsPayloadInterface) {
      try {
        this.isloading = true
        this.errors = []
        this.errors = {}
        console.log('payload', payload)
        const token = useCookie('token')

        for (const [key, value] of Object.entries(payload)) {
          if (!value) this.errors[key] = `${key} not exist`
        }

        // useFetch from nuxt 3
        const { data, pending }: any = await useFetch(
          `http://localhost:8000/api/v1/news`,
          {
            method: 'post',
            headers: {
              Authorization: `Bearer ${token.value}`,
              'Content-Type': 'application/json',
            },
            body: payload,
          },
        ).catch((error) => error.data)
        // this.isloading = pending
        console.log('pending', pending)
        console.log('data', data.value)

        this.isloading = false
      } catch (error) {
        console.log('error', error)
      }
    },
    async getNews(payload: string) {
      this.isloading = true
      this.errors = []
      this.errors = {}
      // console.log('payload', payload)

      // for (const [key, value] of Object.entries(payload)) {
      //   if (!value) this.errors[key] = `${key} not exist`
      // }

      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch(
        `http://localhost:8000/api/v1/news/${payload}`,
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
          // body: payload,
        },
      ).catch((error) => console.error('error', error))
      // this.isloading = pending
      // console.log('pending', pending)
      console.log('data', data.value)

      if (data) this.currentNews = data.value.data.data

      this.isloading = false
    },
    async removeNews() {},
  },
  getters: {
    newsList: (state) => state.news,
    // isloading: (state) => state.isloading,
  },
})
