import { defineStore } from 'pinia'

const SETTINGS_LOCAL_STORAGE_KEY = 'settings'

const getDefaultSettings = () => ({
  fontSize: 14,
  tabSize: 2,
  zoomLevel: 0,
  view: 'tile', // tile or list
  paginationLimit: 15,
})

const getSettings = () => {
  if (process.client) {
    const settings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY)
    return settings ? JSON.parse(settings) : getDefaultSettings()
  }
  return getDefaultSettings()
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: getSettings(),
  }),
})
