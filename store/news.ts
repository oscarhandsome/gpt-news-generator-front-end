import { defineStore } from 'pinia'
import Api from '~/services/api'

import { clearObject } from '@/utils/utils'

import type { NewsPayloadInterface, INews } from '@/types'

// function onlyUnique(value: string, index: number, array: string[]) {
//   return array.indexOf(value) === index
// }

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as INews[],
    currentNews: {} as INews,
    famousPersons: [] as String[],
    isLoading: false,
    isLoadingLocal: false,
    errors: {},
    error: '',
    success: false,
  }),
  actions: {
    async getAllNews(payload?) {
      this.isLoading = true
      const { data, pending }: any = await Api.get('/news', payload)
      if (data.value) {
        this.news = data.value.data.data

        if (!payload) {
          const unique = [
            ...new Set(this.news.map((item) => item.famousPerson)),
          ]
          this.famousPersons = unique.map((name) => ({
            name,
          }))
        }
      }
      this.isLoading = pending.value
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
      const { $toaster } = useNuxtApp()
      // const router = useRouter()
      try {
        this.errors = clearObject(this.errors)

        // for (const [key, value] of Object.entries(payload)) {
        //   if (!value) this.errors[key] = `Field required`
        // }

        // console.log('this.errors', this.errors)
        // if (Object.keys(this.errors).length) throw new Error('we have errors')

        this.isLoading = true
        const { data, pending, error }: any = await Api.post('/news', payload)
        this.isLoading = pending.value

        // console.log('data.value', data.value)
        // console.log('pending.value', pending.value)
        // console.log('error.value', error.value)

        if (data.value && data.value.status === 'success') {
          this.currentNews = data.value.data.news
          $toaster.info({
            title: 'Success',
            message: `News ${this.currentNews.name} successfully created!`,
          })
          navigateTo(`/news/${this.currentNews.slug}`)
        }

        if (error.value) {
          console.error(error.value)
          // if (data.value.errors) this.errors = data.value.errors.value
          // this.error = 'Password or email incorrect!'
          this.error = error.value.data.message
          $toaster.error({
            title: 'Error',
            message: this.error,
            type: 'error',
          })
          setTimeout(() => {
            this.error = ''
          }, 3500)
          console.error('this.error', this.error)
        }
      } catch (error) {
        console.error('error', error)
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
    async updateNews(payload: any) {
      const { $toaster } = useNuxtApp()
      this.isLoadingLocal = true
      const { data, pending, error }: any = await Api.patch(
        `/news/${payload.id}`,
        payload,
      )
      this.isLoadingLocal = pending.value

      if (data.value && data.value.status === 'success') {
        $toaster.info({
          title: 'Success',
          message: `News ${this.currentNews.name} successfully updated!`,
        })
      }

      if (error.value) {
        console.error(error.value)
        // if (data.value.errors) this.errors = data.value.errors.value
        // this.error = 'Password or email incorrect!'
        this.error = error.value.data.message
        $toaster.error({
          title: 'Error',
          message: this.error,
          type: 'error',
        })
      }
    },
    async updateFullNews(payload: any) {
      const { $toaster } = useNuxtApp()
      this.isLoadingLocal = true
      const { data, pending, error }: any = await Api.put(
        `/news/${payload.id}`,
        payload,
      )
      this.isLoadingLocal = pending.value

      if (data.value && data.value.status === 'success') {
        $toaster.info({
          title: 'Success',
          message: `News ${this.currentNews.name} successfully updated!`,
        })
      }

      if (error.value) {
        console.error(error.value)
        // if (data.value.errors) this.errors = data.value.errors.value
        // this.error = 'Password or email incorrect!'
        this.error = error.value.data.message
        $toaster.error({
          title: 'Error',
          message: this.error,
          type: 'error',
        })
      }
    },
    async removeNews() {},
    async getMyNews() {
      this.isLoading = true
      const { data, pending }: any = await Api.get(`/news/my-news`)
      if (data.value) this.news = data.value.data.data
      this.isLoading = pending.value
    },
    async getNewsByAutorId(payload: string) {
      this.isLoading = true
      const { data, pending }: any = await Api.get(`/news/autor/${payload}`)
      if (data.value) this.news = data.value.data.data
      this.isLoading = pending.value
    },
    async getNewsImagesResuls(payload: { id: string; workflowRunId: string }) {
      this.isLoadingLocal = true
      // this.currentNews = await Api.get(`/news/${payload}`)
      const { data, pending }: any = await Api.get(
        `/news/${payload.id}/getImageResuts/${payload.workflowRunId}`,
      )
      if (data.value) this.currentNews = data.value.data.data
      this.isLoadingLocal = pending.value
    },
    async generateNewImages(payload: { id: string; prompt: string }) {
      console.log({ ...payload })
      this.isLoadingLocal = true
      const { data, pending }: any = await Api.post(
        `/news/${payload.id}`,
        payload,
      )
      console.log('data.value', data.value)
      this.isLoadingLocal = pending.value
    },
  },
  getters: {
    newsList: (state) => state.news,
    // isLoading: (state) => state.isLoading,
  },
})
