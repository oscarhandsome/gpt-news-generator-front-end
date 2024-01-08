<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
// import { useToast } from 'tailvue'
// const $toast = useToast()

import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/store/auth' // import the auth store we just created

// import { clearObject } from '@/utils/utils'

const { $toaster } = useNuxtApp()

definePageMeta({
  layout: 'custom',
  // middleware: 'auth',
})

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated, success, isLoading, error, errors } = storeToRefs(
  useAuthStore(),
) // make isAuthenticated state reactive with storeToRefs

const data = ref({
  email: '',
  password: '',
  remember: false,
})
const router = useRouter()

const login = async () => {
  await authenticateUser(data.value) // call authenticateUser and pass the user object
  if (isAuthenticated.value) router.push('/') // redirect to homepage if user is isAuthenticated
}

// GOOGLE AUTH2.0
// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response
  if (credential) {
    await authenticateUser({ token: credential })
    if (isAuthenticated.value && success.value) router.push('/')
  }
}

// handle an error event
const handleLoginError = (error: string) => {
  console.error('Login failed')
  console.error('error', error)
  // error.value = error
  // window.scrollTo(0, 0)
  $toaster.error({
    title: 'Error',
    message: error,
  })
}

// onMounted(() => {
//   $toast.show('onMounted success!')
// })

onBeforeUnmount(() => {
  success.value = false
})
</script>

<template>
  <BaseError :text="error" class="z-10 mx-auto w-[90%] sm:w-auto max-w-xl" />
  <div
    class="relative my-2 sm:my-3 lg:my-5 w-full max-w-sm sm:mx-auto mt-0 sm:shadow-2xl"
  >
    <!-- <h1 class="text-2xl text-center mb-5">Login page</h1> -->
    <div
      class="bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:sm:border-gray-700 p-4 sm:p-6 md:p-8 mx-auto"
    >
      <div
        v-if="!isLoading && success"
        class="flex flex-col justify-center items-center"
      >
        <CheckIcon class="h-20 w-20 text-green-500 mb-5" />
        <p>You have logged successful!</p>
      </div>

      <!-- LOADER -->
      <BaseLoader :show="isLoading" absolute />

      <form
        v-if="!success"
        class="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4"
        @submit.prevent="login"
      >
        <p class="text-xl font-medium text-gray-900 dark:text-white">
          Log in to our platform
        </p>

        <div class="h-10">
          <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"
          ></GoogleSignInButton>
        </div>

        <!-- OR  -->
        <div class="flex items-center w-full">
          <div class="flex flex-grow h-1 bg-gray-300"></div>
          <div class="text-gray-300 mx-2">or</div>
          <div class="flex flex-grow h-1 bg-gray-300"></div>
        </div>

        <BaseInput
          v-model="data.email"
          label="Email"
          type="string"
          error=""
          placeholder="name@example.com"
          required
        />
        <BaseInput
          v-model="data.password"
          label="Password"
          name="password"
          type="password"
          error=""
          placeholder="••••••••••••••••••••"
          required
        />

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
          aria-label="Login"
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

        <BaseMainPageButton />
      </form>
    </div>
  </div>
</template>
