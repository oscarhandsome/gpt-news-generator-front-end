<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  // DialogDescription,
} from '@headlessui/vue'

import { XCircleIcon } from '@heroicons/vue/20/solid'

defineProps({
  title: {
    type: String,
    default: '',
  },
})

// The open/closed state lives outside of the Dialog and
// is managed by you.
const isOpen = ref(true)

function setIsOpen(value) {
  isOpen.value = value
}
</script>

<template>
  <Dialog :open="isOpen" class="relative z-50" @close="setIsOpen">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Full-screen scrollable container -->
    <div class="fixed inset-0 w-screen overflow-y-auto">
      <!-- Container to center the panel -->
      <div class="flex min-h-full items-center justify-center">
        <!-- The actual dialog panel -->
        <DialogPanel class="rounded bg-white">
          <DialogTitle v-if="title">{{ title }}</DialogTitle>
          <slot />

          <button @click="setIsOpen(false)">
            <XCircleIcon class="inline h-5 w-5 mr-1" aria-hidden="true" /> Close
          </button>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
