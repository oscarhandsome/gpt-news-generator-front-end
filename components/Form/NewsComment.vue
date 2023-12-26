<script lang="ts" setup>
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia'
import { useCommentsStore } from '@/store/comments'
import { useAuthStore } from '~/store/auth'

const props = defineProps<{
  currentNewsId: string
  parentId?: string
}>()

const { postComment } = useCommentsStore()
const { isLoadingLocal, error } = storeToRefs(useCommentsStore())

// const { updatePassword } = useAuthStore()
const { isAuthenticated } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const data = reactive({
  id: props.currentNewsId,
  comment: '',
})

const submitForm = async () => {
  if (props.parentId) data.parentId = props.parentId
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
        class="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700"
        :class="[
          isAuthenticated
            ? 'bg-white dark:bg-gray-800'
            : 'bg-gray-100 cursor-not-allowed',
        ]"
      >
        <label for="comment" class="sr-only">Your comment</label>
        <textarea
          id="comment"
          v-model="data.comment"
          rows="6"
          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          :class="{
            'cursor-not-allowed': !isAuthenticated,
          }"
          :placeholder="
            isAuthenticated ? 'Write a comment...' : 'Sign in required...'
          "
          required
          :disabled="!isAuthenticated"
        ></textarea>
      </div>
      <button
        aria-label="News Comment"
        type="submit"
        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black dark:text-black dark:bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 transition-opacity"
        :class="{
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed':
            !isAuthenticated,
          'hover:opacity-60': isAuthenticated,
        }"
        :disabled="!isAuthenticated"
      >
        Post comment
      </button>
    </form>
  </div>
</template>
