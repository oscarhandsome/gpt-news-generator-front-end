// import { useFetch } from '@nuxt/http'
// import { useCookies } from '@nuxtjs/cookie-universal-nuxt'

const BASE_URL = `http://localhost:8000/api/v1`
// const token = useCookie('token')

class Api {
  // constructor() {
  //   // this.path = `${BASE_URL}${path}`
  //   // this.token = useCookie('token')
  // }

  static async get(path: string, params: object = {}) {
    try {
      const token = useCookie('token')
      const response: any = await useFetch(`${BASE_URL}${path}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })
      console.log('response')
      if (response.data.value.status === 'success')
        return response.data.value.data.data
    } catch (error) {
      return error
    }
  }

  // static async post(path, body = {}) {
  //   const { fetch, data } = useFetch()
  //   const cookies = useCookies()
  //   const token = cookies.get('token')

  //   await fetch(path, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   })

  //   return data.value
  // }

  // static async put(path, body = {}) {
  //   const { fetch, data } = useFetch()
  //   const cookies = useCookies()
  //   const token = cookies.get('token')

  //   await fetch(path, {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   })

  //   return data.value
  // }

  // static async delete(path, params = {}) {
  //   const { fetch, data } = useFetch()
  //   const cookies = useCookies()
  //   const token = cookies.get('token')

  //   await fetch(path, {
  //     method: 'DELETE',
  //     params,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  //   return data.value
  // }
}

export default Api
