<script lang="ts" setup>
import { ArrowUpIcon } from '@heroicons/vue/20/solid'

const moveUp = () => window.scrollTo(0, 0)
</script>

<template>
  <button
    class="fixed bottom-2 sm:bottom-5 right-2 sm:right-5 bg-black rounded-lg hover:opacity-60 active:opacity-60 p-2"
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
