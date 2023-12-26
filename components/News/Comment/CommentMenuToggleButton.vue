<script lang="ts" setup>
defineEmits(['toogle-comment-menu'])
defineProps({
  id: {
    type: String,
    default: 'id0',
  },
})
</script>

<template>
  <button
    :id="id"
    aria-label="Toggle menu for current comment"
    :data-dropdown-toggle="id"
    class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button"
    @click="$emit('toogle-comment-menu')"
  >
    <svg
      class="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 3"
    >
      <path
        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
      />
    </svg>
    <span class="sr-only">Comment settings</span>
  </button>
</template>
