<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

import { CheckIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'custom',
  // middleware: 'auth',
})

const { passwordConfirm } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated, success } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const isLoading = ref(false)
const data = ref({
  email: 'johndoe1070@gmail.com',
  password: 'pass1234',
  remember: false,
})
const route = useRoute()

// const passwordConfirm = async () => {
//   await passwordConfirm(router.params.token) // call authenticateUser and pass the user object
// }
if (route.params && route.params.token)
  await passwordConfirm(route?.params?.token)
console.log('route', route.params.token)
</script>

<template>
  <div class="lg:my-5">
    <h1 class="text-2xl text-center mb-5">Confirm password page</h1>

    <div
      class="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        v-if="!isLoading && success"
        class="flex flex-col justify-center items-center"
      >
        <CheckIcon class="h-20 w-20 text-green-500 mb-5" />
        <p>You have logged successful!</p>
      </div>
      <BaseLoader v-if="isLoading" />
      <div v-else-if="!isLoading && !success">
        Please check your email to finish registration
      </div>
    </div>
  </div>
</template>
