import { defineStore } from 'pinia'

interface ICommonStore {
  isModal: boolean
  isFeedbackStatus: boolean
  fullImageUrl: string
}

const defaultStoreValue: ICommonStore = {
  isModal: false,
  isFeedbackStatus: false,
  fullImageUrl: '',
}

export const useCommonStore = defineStore('common', {
  state: () => defaultStoreValue,
  actions: {
    setModal(value: boolean) {
      this.isModal = value
    },
    clearModal() {
      this.$patch(defaultStoreValue)
    },
    setFullImageUrl(url: string) {
      this.fullImageUrl = url
    },
    setModalFeedback(value: boolean) {
      this.isFeedbackStatus = value
    },
  },
  getters: {
    isOpen: (state) => state.isModal,
    getFeedbackStatus: (state) => state.isFeedbackStatus,
  },
})
