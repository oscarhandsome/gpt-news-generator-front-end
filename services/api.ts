// import { useFetch } from '@nuxt/http'
// import { useCookies } from '@nuxtjs/cookie-universal-nuxt'
import { useMyFetch } from '@/composables/useMyFetch'

// const config = useRuntimeConfig()
// const token = useCookie('token')

class Api {
  // constructor() {
  //   // this.path = `${BASE_URL}${path}`
  //   // this.token = useCookie('token')
  // }

  static async get(path: string, params: object = {}) {
    return await useMyFetch(`${path}`, { method: 'GET', params })
  }

  static async post(path: string, body: object = {}) {
    return await useMyFetch(path, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  static async patch(path: string, body: object = {}) {
    return await useMyFetch(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  static async put(path: string, body: object = {}) {
    return await useMyFetch(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  static async delete(path: string, params: object = {}) {
    return await useMyFetch(path, {
      method: 'DELETE',
      params,
    })
  }
}

export default Api
