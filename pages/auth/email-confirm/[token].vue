<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

definePageMeta({
  layout: 'custom',
  // middleware: 'auth',
})

const { emailConfirm } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated, success, isLoading } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const route = useRoute()
const router = useRouter()

// const emailConfirm = async () => {
//   await emailConfirm(router.params.token) // call authenticateUser and pass the user object
// }
if (process.client) await emailConfirm(`${route.params.token}`)
// console.log('route', route.params.token)
if (isAuthenticated.value && success.value) router.push('/')
</script>

<template>
  <!-- LOADER -->
  <!-- <BaseLoader :show="isLoading" absolute /> -->
  <div class="lg:my-5">
    <h1 class="text-2xl text-center mb-5">Email confirm page</h1>

    <div
      class="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        v-if="!isLoading && success"
        class="flex flex-col justify-center items-center"
      >
        <CheckIcon class="h-20 w-20 text-green-500 mb-5" />
        <p>You have logged successful!</p>

        <BaseMainPageButton />
      </div>
      <BaseLoader v-if="isLoading" />
      <div v-else-if="!isLoading && !success">
        Something went wrong, please contact with support.

        <BaseMainPageButton />
      </div>
    </div>
  </div>
</template>
