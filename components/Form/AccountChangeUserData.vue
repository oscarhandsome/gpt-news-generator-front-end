<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'

const { updateUserData } = useAuthStore()
const { isLoading, errors } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

// const router = useRouter()

const data = reactive({
  name: '',
  position: '',
})

const submitForm = () => updateUserData(data)
</script>

<template>
  <BaseLoader v-if="isLoading" />
  <div
    v-else
    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 mx-auto"
  >
    <form @submit.prevent="submitForm">
      <div>
        <BaseInput
          v-model="data.name"
          placeholder="John Doe"
          label="Current position"
          type="string"
          :error="errors.name"
          required
          class="mb-3"
          @update:model-value="data.name = $event"
        />

        <BaseInput
          v-model="data.position"
          label="Position"
          type="string"
          :error="errors.position"
          placeholder="Correspondent"
          required
          class="mb-3"
          @update:model-value="data.position = $event"
        />
      </div>

      <button
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
      >
        Send
      </button>
    </form>
  </div>
</template>
