// a plugin that listens for when page load is complete then scroll to the top

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('page:finish', () => {
//     // console.log('Page finished loading..')
//     window.scrollTo(0, 0)
//   })
// })

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxt) => {
  nuxt.$router.options.scrollBehavior = (to, from, savedPosition) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ left: 0, top: 0, behaviour: 'smooth' })
        }
      }, 100)
    })
  }
})
