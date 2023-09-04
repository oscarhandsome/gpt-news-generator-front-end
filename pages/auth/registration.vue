<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

import { CheckIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'custom',
  middleware: 'auth',
})
const { signUp } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated, success, errors } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const isLoading = ref(false)
// const router = useRouter()
// const route = useRouter()

const data = reactive({
  email: 'johndoe1080@gmail.com',
  password: 'pass1234',
  passwordConfirm: 'pass1234',
})

const submitForm = async () => {
  try {
    await signUp(data)
    // route.push("/home");
  } catch (error) {
    console.error(error)
    alert(error)
  }
}
</script>

<template>
  <div class="lg:my-5">
    <h1 class="text-2xl text-center mb-5">Register page</h1>

    <div
      class="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        v-if="!isLoading && success"
        class="flex flex-col justify-center items-center"
      >
        <CheckIcon class="h-20 w-20 text-green-500 mb-5" />
        <p>Please check your email!</p>
      </div>
      <BaseLoader v-if="isLoading" />
      <form
        v-else-if="!isLoading && !success"
        class="space-y-6"
        @submit.prevent="submitForm"
      >
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign up to our platform
        </h5>
        <div>
          <BaseInput
            v-model="data.name"
            label="Name"
            type="string"
            :error="errors.name"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <BaseInput
            v-model="data.email"
            label="Email"
            type="email"
            :error="errors.email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div>
          <BaseInput
            v-model="data.password"
            label="password"
            name="password"
            type="password"
            :error="errors.password"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <BaseInput
            v-model="data.passwordConfirm"
            label="Confirm password"
            type="password"
            :error="errors.passwordConfirm"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Have account?
          <nuxt-link
            to="/auth/login"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Login here</nuxt-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
