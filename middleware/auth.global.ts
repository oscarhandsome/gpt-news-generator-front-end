import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, user } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive
  const token = useCookie('token') // get token from cookies

  // isAuthenticated.value = !!token.value
  if (token.value) {
    // check if value exists
    isAuthenticated.value = true // update the state to isAuthenticated
  }
  if (process.client) {
    const localUser = localStorage.getItem('user')
    user.value = localUser ? JSON.parse(localUser) : null
  }

  if (
    (token.value && to?.name === 'auth-login') ||
    (token.value && to?.name === 'auth-registration')
  ) {
    // if token exists and url is /login redirect to homepage
    console.log('navigateTo')
    return navigateTo('/')
  }

  if (
    (!token.value && to?.name === 'news-create') ||
    (!token.value && to?.name === 'me')
  ) {
    abortNavigation()
    return navigateTo('/auth/login')
  }

  // if token doesn't exist redirect to log in
  // if (!token.value && to?.name !== 'auth-login') {
  //   abortNavigation()
  //   return navigateTo('/auth/login')
  // }
})
