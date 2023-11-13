<script lang="ts" setup>
import { HomeIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="mx-auto text-center">
    <nuxt-link
      to="/"
      class="text-sm font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-300 border dark:border-gray-700 transition-colors rounded-lg p-1"
    >
      <HomeIcon class="h-5 w-5 inline" />
      Main page
    </nuxt-link>
  </div>
</template>
