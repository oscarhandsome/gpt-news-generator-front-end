<script lang="ts" setup>
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'
import { useAuthStore } from '~/store/auth'

const prop = defineProps<{ currentNewsId: string }>()

const { postComment } = useNewsStore() // use authenticateUser action from  auth store
const { isLoadingLocal, error, errors, currentNews } = storeToRefs(
  useNewsStore(),
) // make isAuthenticated state reactive with storeToRefs

// const { updatePassword } = useAuthStore()
const { isAuthenticated } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const data = reactive({
  id: prop.currentNewsId,
  comment: '',
})

const submitForm = async () => {
  const res = await postComment(data)
  if (res) data.comment = ''
}
</script>

<template>
  <div class="relative">
    <BaseError :text="error" class="z-10 mx-auto w-full sm:w-auto max-w-xl" />
    <!-- LOADER -->
    <BaseLoader :show="isLoadingLocal" absolute />
    <form class="mb-6" @submit.prevent="submitForm">
      <div
        class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <label for="comment" class="sr-only">Your comment</label>
        <textarea
          id="comment"
          rows="6"
          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
          v-model="data.comment"
          :disabled="!isAuthenticated"
        ></textarea>
      </div>
      <button
        aria-label="News Comment"
        type="submit"
        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black dark:text-black dark:bg-white hover:opacity-60 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 transition-opacity"
        :class="{
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed':
            !isAuthenticated,
        }"
        :disabled="!isAuthenticated"
      >
        Post comment
      </button>
    </form>
  </div>
</template>
