import { defineStore } from 'pinia'
import Api from '~/services/api'

import { Stats } from '@/types'

const getDefaultInfo = () => ({
  info: null,
})

export const useStatsStore = defineStore('stats', {
  state: () => ({
    info: getDefaultInfo(),
  }),
  actions: {
    async getInfo() {
      const { data }: Stats = await Api.get(`/stats/info`)
      if (data.value) this.info = data.value.data
    },
  },
})
