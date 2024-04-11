<script lang="ts" setup>
import { ArrowUpIcon } from '@heroicons/vue/20/solid'

const moveUp = () => window.scrollTo(0, 0)
const onScroll = () => {
  console.log('onScroll')
}
</script>

<template>
  <button
    aria-label="Move up on page"
    class="fixed bottom-2 sm:bottom-5 right-2 sm:right-5 bg-black dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-600 rounded-lg hover:opacity-60 active:opacity-60 p-2"
    type="button"
    @click="moveUp"
    @scroll.passive="onScroll"
  >
    <ArrowUpIcon class="flex-shrink-0 h-5 w-5 text-white" aria-hidden="true" />
  </button>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
