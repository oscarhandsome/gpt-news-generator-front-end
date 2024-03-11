// import { useFetch } from '@nuxt/http'
// import { useCookies } from '@nuxtjs/cookie-universal-nuxt'
import { useMyFetch } from '@/composables/useMyFetch'

class Api {
  // constructor() {
  //   // this.path = `${BASE_URL}${path}`
  //   // this.token = useCookie('token')
  // }

  public async get(path: string, params: object = {}) {
    console.log('params in get', params)
    return await useMyFetch(`${path}`, { method: 'GET', params })
  }

  public async post(path: string, body: object = {}) {
    return await useMyFetch(path, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  public async patch(path: string, body: object = {}) {
    return await useMyFetch(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  public async put(path: string, body: object = {}) {
    return await useMyFetch(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  public async delete(path: string) {
    return await useMyFetch(path, {
      method: 'DELETE',
    })
  }
}

const api = new Api()

export default api
