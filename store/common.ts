import { defineStore } from 'pinia'

interface ICommonStore {
  isModal: boolean
}

const defaultStoreValue: ICommonStore = {
  isModal: false,
}

export const useCommonStore = defineStore('common', {
  state: () => defaultStoreValue,
  actions: {
    setModal(value: boolean) {
      this.isModal = value
    },
  },
  getters: {
    isOpen: (state) => state.isModal,
  },
})
