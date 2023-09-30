<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'
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
  email: '',
  password: '',
  remember: false,
})
const router = useRouter()

const login = async () => {
  if (!data.email || !data.password) {
    error.value = 'Sorry fields are empty'
    window.scrollTo(0, 0)
    clearErrors()
    return
  }

  try {
    await authenticateUser(data.value) // call authenticateUser and pass the user object
    // redirect to homepage if user is isAuthenticated
    if (isAuthenticated.value) {
      // $toast.show('success!')
      setTimeout(() => {
        // router.push('/news/create')
        // router.push('/news/my-news')
        router.push('/')
      }, 2000)
    }
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

onBeforeUnmount(() => {
  success.value = false
})

const clearErrors = () => {
  setTimeout(() => {
    error.value = ''
  }, 2500)
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
const handleLoginError = (error) => {
  console.error('Login failed')
  console.log('error', error)
}
</script>

<template>
  <div class="lg:my-5">
    <h1 class="text-2xl text-center mb-5">Login page</h1>

    <div
      class="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <!-- <div
        v-if="!isLoading && success"
        class="flex flex-col justify-center items-center"
      >
        <CheckIcon class="h-20 w-20 text-green-500 mb-5" />
        <p>You have logged successful!</p>
      </div> -->

      <!-- LOADER -->
      <BaseLoader v-if="isLoading" />

      <form v-else class="space-y-6" @submit.prevent="login">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Log in to our platform
        </h5>
        <BaseError :text="error" />

        <GoogleSignInButton
          @success="handleLoginSuccess"
          @error="handleLoginError"
        ></GoogleSignInButton>

        <!-- OR  -->
        <div class="flex items-center w-full">
          <div class="flex flex-grow h-1 bg-gray-300"></div>
          <div class="text-gray-300 mx-2">or</div>
          <div class="flex flex-grow h-1 bg-gray-300"></div>
        </div>

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
