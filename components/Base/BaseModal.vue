<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  // DialogDescription,
} from '@headlessui/vue'

import { XCircleIcon } from '@heroicons/vue/20/solid'

import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/store/common'

const { setModal } = useCommonStore()
const { isOpen } = storeToRefs(useCommonStore())

defineProps({
  title: {
    type: String,
    default: '',
  },
})

// The open/closed state lives outside of the Dialog and
// is managed by you.
// const isOpen = ref(true)

function setIsOpen(value) {
  // isOpen.value = value
  setModal(value)
}
</script>

<template>
  <ClientOnly>
    <Dialog :open="isOpen" class="relative z-50" @close="setIsOpen">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex min-h-full items-center justify-center">
          <!-- The actual dialog panel -->
          <DialogPanel class="relative rounded-lg bg-white">
            <DialogTitle v-if="title">{{ title }}</DialogTitle>
            <slot />

            <button
              class="absolute top-2 right-2 bg-white rounded-full outline-none hover:text-red-400 active:text-red-400 transition-colors"
              @click="setIsOpen(false)"
            >
              <XCircleIcon
                class="inline h-5 lg:h-10 w-5 lg:w-10"
                aria-hidden="true"
              />
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </ClientOnly>
</template>
