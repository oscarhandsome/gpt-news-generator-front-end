<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

definePageMeta({
  layout: 'custom',
  // middleware: 'auth',
})

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated, success, isLoading, error } = storeToRefs(
  useAuthStore(),
) // make isAuthenticated state reactive with storeToRefs

const data = ref({
  email: 'johndoe1027@gmail.com',
  password: 'pass1234',
  remember: false,
})
const router = useRouter()

const login = async () => {
  await authenticateUser(data.value) // call authenticateUser and pass the user object
  // redirect to homepage if user is isAuthenticated
  if (isAuthenticated.value) {
    // $toast.show('success!')
    setTimeout(() => {
      // router.push('/news/create')
      // router.push('/news/my-news')
      router.push('/')
      success.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="lg:my-5">
    <h1 class="text-2xl text-center mb-5">Login page</h1>

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
      <form
        v-else-if="!isLoading && !success"
        class="space-y-6"
        @submit.prevent="login"
      >
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Log in to our platform
        </h5>
        <BaseError :text="error" />
        <div>
          <BaseInput
            :model-value="data.email"
            label="Email"
            type="string"
            error=""
            placeholder="name@example.com"
            required
            @update:model-value="data.email = $event"
          />
        </div>
        <div>
          <BaseInput
            :model-value="data.password"
            label="Password"
            name="password"
            type="password"
            error=""
            placeholder="••••••••"
            required
            @update:model-value="data.password = $event"
          />
        </div>
        <div class="flex items-start">
          <BaseCheckbox
            id="remember"
            label="Remember me"
            :model-value="data.remember"
            name="remember"
            error=""
            class="h-5"
            @update:model-value="data.remember = $event"
          />
          <nuxt-link
            to="/auth/forgot-password"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Lost Password?
          </nuxt-link>
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <nuxt-link
            to="/auth/registration"
            class="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
