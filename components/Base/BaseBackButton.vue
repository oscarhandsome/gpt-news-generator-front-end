<script lang="ts" setup>
import { ArrowLeftCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <button
    class="flex items-center bg-gray-100 border border-gray-300 hover:bg-black hover:text-white active:bg-black active:text-white transition-colors rounded p-1"
    @click="$router.go(-1)"
  >
    <ArrowLeftCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
    <span class="ml-2 pr-2">Back</span>
  </button>
</template>
