<script lang="ts" setup>
import { CheckIcon, HomeIcon } from '@heroicons/vue/24/solid'

import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

import { clearObject } from '@/utils/utils'

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
  clearErrors()
  window.scrollTo(0, 0)

  // for (const [key, value] of Object.entries(data.value)) {
  //   console.log('key, value', key, value)
  //   errors.value[key] = 'Field empty'
  // }
  // console.log('errors.value', errors.value)

  if (!data.value.email || !data.value.password) {
    error.value = 'Sorry some fields are empty'
    return
  }

  try {
    await authenticateUser(data.value) // call authenticateUser and pass the user object
    // redirect to homepage if user is isAuthenticated
    if (isAuthenticated.value) {
      // $toast.show('success!')
      router.push('/')
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
    // errors.value = ref(clearObject(errors.value))
  }, 3500)
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
  <div
    class="relative my-2 sm:my-3 lg:my-5 w-full max-w-sm sm:mx-auto mt-0 sm:shadow-2xl"
  >
    <!-- <h1 class="text-2xl text-center mb-5">Login page</h1> -->
    <div
      class="bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700 p-4 sm:p-6 md:p-8 mx-auto"
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
        class="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4"
        @submit.prevent="login"
      >
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Log in to our platform
        </h5>
        <BaseError :text="error" class="z-10" />

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

        <div>
          <BaseInput
            :model-value="data.email"
            label="Email"
            type="string"
            :error="errors.email"
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
            :error="errors.password"
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
            :error="errors.remember"
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

        <div class="mx-auto text-center">
          <nuxt-link
            to="/"
            class="text-sm font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-300 border transition-colors rounded-lg p-1"
          >
            <HomeIcon class="h-5 w-5 inline" />
            Main page
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
