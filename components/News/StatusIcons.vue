<script lang="ts" setup>
import { XMarkIcon, CheckIcon } from '@heroicons/vue/20/solid'

defineProps({
  status: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <XMarkIcon
    v-if="!status"
    class="inline h-5 w-5 text-red-400"
    aria-hidden="true"
  />
  <CheckIcon v-else class="inline h-5 w-5 text-green-500" aria-hidden="true" />
</template>
