<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'

const { updatePassword } = useAuthStore()
const { isLoadingLocal, errors } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

// const router = useRouter()

const data = reactive({
  passwordCurrent: '',
  password: '',
  passwordConfirm: '',
})

const submitForm = () => updatePassword(data)
</script>

<template>
  <BaseLoader v-if="isLoadingLocal" />
  <div
    v-else
    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 mx-auto"
  >
    <form @submit.prevent="submitForm">
      <div>
        <BaseInput
          v-model="data.passwordCurrent"
          placeholder="*****"
          label="Current Password"
          type="password"
          :error="errors.passwordCurrent"
          required
          class="mb-3"
          @update:model-value="data.passwordCurrent = $event"
        />

        <BaseInput
          v-model="data.password"
          label="Password"
          type="password"
          :error="errors.password"
          placeholder="*****"
          required
          class="mb-3"
          @update:model-value="data.password = $event"
        />

        <BaseInput
          v-model="data.passwordConfirm"
          label="Password Confirm"
          type="password"
          :error="errors.passwordConfirm"
          placeholder="*****"
          required
          class="mb-3"
          @update:model-value="data.passwordConfirm = $event"
        />
      </div>

      <button
        aria-label="Account change password"
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
      >
        Send
      </button>
    </form>
  </div>
</template>
