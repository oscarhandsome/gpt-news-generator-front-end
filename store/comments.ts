import { defineStore, storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'
import type { IComment } from '@/types'
import Api from '~/services/api'

export const useCommentsStore = defineStore('comment', {
  state: () => ({
    comments: [] as IComment[],
    isLoading: false,
    isLoadingLocal: false,
    errors: {},
    error: '',
    success: false,
  }),
  actions: {
    async postComment(payload: { id: string; comment: string }) {
      const { $toaster } = useNuxtApp()
      const newsStore = useNewsStore()
      const { currentNews } = storeToRefs(newsStore)

      this.isLoadingLocal = true
      const { data, pending, error }: any = await Api.post(
        `/news/${payload.id}/comments`,
        payload,
      )
      this.isLoadingLocal = pending.value
      if (data.value) {
        currentNews.value.comments.push(data.value.data.data)
        $toaster.info({
          title: 'Posted!',
          message: 'Message succesfull sent',
        })
        return data.value.data.data
      }
      if (error.value) {
        $toaster.error({
          title: `Error, status: ${error.value.data.status}, code: ${error.value.data.error.statusCode}`,
          message: error.value.data.message,
        })
      }
    },
    async updateComment(payload: any) {
      const { $toaster } = useNuxtApp()
      const newsStore = useNewsStore()
      const { currentNews } = storeToRefs(newsStore)
      this.isLoadingLocal = true
      const { data, pending, error }: any = await Api.patch(
        `/comments/${payload.id}`,
        payload,
      )
      this.isLoadingLocal = pending.value
      if (data.value) {
        const idx = currentNews.value.comments.findIndex(
          (item) => item.id === data.value.data.data.id,
        )
        // currentNews.value.comments = currentNews.value.comments.splice(idx, 1, data.value.data.data )
        currentNews.value.comments[idx] = data.value.data.data
        $toaster.info({
          title: 'Updated',
          message: 'Message succesfull updated!',
        })
      }
      if (error.value) {
        $toaster.error({
          title: 'Error',
          message: error.value,
        })
      }
    },
    async deleteComment(payload: any) {
      const newsStore = useNewsStore()
      const { currentNews } = storeToRefs(newsStore)
      this.isLoadingLocal = true

      const { data, pending, error }: any = await Api.delete(
        `/comments/${payload.id}`,
      )
      this.isLoadingLocal = pending.value
      const idx = currentNews.value.comments.findIndex(
        (item) => item.id === payload.id,
      )
      currentNews.value.comments.splice(idx, 1)
    },
  },
  getters: {
    commentsList: (state) => state.comments,
    // isLoading: (state) => state.isLoading,
  },
})
