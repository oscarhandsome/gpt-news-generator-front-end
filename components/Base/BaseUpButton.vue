<script lang="ts" setup>
import { ArrowUpIcon } from '@heroicons/vue/20/solid'

const moveUp = () => window.scrollTo(0, 0)
const backToTopID = ref(null)
onMounted(() => {
  if (process.client) {
    window.onscroll = function () {
      scrollFunction()
    }
  }
})

onUnmounted(() => {
  if (process.client) {
    window.onscroll = function () {}
  }
})

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopID.value.style.display = 'block'
  } else {
    backToTopID.value.style.display = 'none'
  }
}
</script>

<template>
  <button
    ref="backToTopID"
    aria-label="Move up on page"
    class="hidden fixed bottom-2 sm:bottom-5 right-14 sm:right-16 bg-black dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-600 rounded-lg hover:opacity-60 active:opacity-60 p-2"
    type="button"
    @click="moveUp"
  >
    <ArrowUpIcon class="flex-shrink-0 h-5 w-5 text-white" aria-hidden="true" />
  </button>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
