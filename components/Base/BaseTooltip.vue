<script lang="ts" setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'

defineProps({
  tooltip: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div v-if="tooltip" class="block ml-2">
    <QuestionMarkCircleIcon
      v-tooltip="tooltip"
      class="h-5 w-5 text-black hover:opacity-60 active:opacity-60 transition-opacity cursor-pointer"
    />
  </div>
</template>
