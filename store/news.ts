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
    famousPersons: [],
    isLoading: false,
    errors: {},
    success: null,
  }),
  actions: {
    async getAllNews() {
      this.isLoading = true
      const { data, pending }: any = await Api.get('/news')
      if (data.value) this.news = data.value.data.data
      // this.famousPersons = this.news.map((item) => ({
      //   name: item.famousPerson,
      // }))
      this.isLoading = false
    },
    // async getAllNews() {
    //   this.isLoading = true
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
    //   // this.isLoading = pending
    //   // console.log('pending', pending)
    //   console.log('data', data.value)

    //   if (data) this.news = data.value.data.data

    //   this.isLoading = false
    // },
    async createNews(payload: NewsPayloadInterface) {
      try {
        this.isLoading = true
        this.errors = []
        this.errors = {}
        console.log('payload', payload)
        // const token = useCookie('token')

        for (const [key, value] of Object.entries(payload)) {
          if (!value) this.errors[key] = `${key} not exist`
        }

        // useFetch from nuxt 3
        this.currentNews = await Api.post('/news', payload)
        // const { data, pending }: any = await useFetch(
        //   `http://localhost:8000/api/v1/news`,
        //   {
        //     method: 'post',
        //     headers: {
        //       Authorization: `Bearer ${token.value}`,
        //       'Content-Type': 'application/json',
        //     },
        //     body: payload,
        //   },
        // ).catch((error) => error.data)
        // this.isLoading = pending
        // console.log('pending', pending)
        // console.log('data', data.value)

        this.isLoading = false
      } catch (error) {
        console.log('error', error)
      }
    },
    async getNews(payload: string) {
      this.isLoading = true
      // this.currentNews = await Api.get(`/news/${payload}`)
      const { data, pending }: any = await Api.get(`/news/${payload}`)
      if (data.value) this.currentNews = data.value.data.data
      this.isLoading = pending.value
    },
    // async getNews(payload: string) {
    //   this.isLoading = true
    //   this.errors = []
    //   this.errors = {}
    //   // console.log('payload', payload)

    //   // for (const [key, value] of Object.entries(payload)) {
    //   //   if (!value) this.errors[key] = `${key} not exist`
    //   // }

    //   // useFetch from nuxt 3
    //   const { data, pending }: any = await useFetch(
    //     `http://localhost:8000/api/v1/news/${payload}`,
    //     {
    //       method: 'get',
    //       headers: { 'Content-Type': 'application/json' },
    //       // body: payload,
    //     },
    //   ).catch((error) => console.error('error', error))
    //   // this.isLoading = pending
    //   // console.log('pending', pending)
    //   console.log('data', data.value)

    //   if (data) this.currentNews = data.value.data.data

    //   this.isLoading = false
    // },
    async removeNews() {},
    async getMyNews() {
      this.isLoading = true
      const { data, pending }: any = await Api.get(`/news/my-news`)
      if (data.value) this.news = data.value.data.data
      this.isLoading = pending.value
    },
  },
  getters: {
    newsList: (state) => state.news,
    // isLoading: (state) => state.isLoading,
  },
})
