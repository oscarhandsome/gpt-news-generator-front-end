<script lang="ts" setup>
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/20/solid'
defineEmits(['toggle-feedback-btn'])
</script>

<template>
  <button
    aria-label="Move up on page"
    class="fixed bottom-2 sm:bottom-5 right-14 sm:right-16 bg-black dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-600 rounded-lg hover:opacity-60 active:opacity-60 p-2"
    type="button"
    @click="$emit('toggle-feedback-btn')"
  >
    <ChatBubbleBottomCenterIcon
      class="flex-shrink-0 h-5 w-5 text-white"
      aria-hidden="true"
    />
  </button>
</template>
