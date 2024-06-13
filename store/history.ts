import { defineStore } from 'pinia'
import type { INews } from '@/types'
// import { useToast } from 'tailvue'
import Api from '~/services/api'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: [] as INews[],
    isLoadingHistory: false,
  }),
  actions: {
    async getHistory({ id }: { id: string }) {
      this.isLoadingHistory = true
      const { data, pending }: any = await Api.get(`/history/${id}`)
      if (data.value) {
        this.history = data.value.data.data.history
      }
      this.isLoadingHistory = pending.value
    },
  },
})
