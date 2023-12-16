<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

// The open/closed state lives outside of the Dialog and
// is managed by you.
const isOpen = ref(true)

function setIsOpen(value) {
  isOpen.value = value
}

function handleDeactivate() {
  // ...
  console.log('handleDeactivate')
}
</script>

<template>
  <Dialog :open="isOpen" class="relative z-50" @close="setIsOpen">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Full-screen scrollable container -->
    <div class="fixed inset-0 w-screen overflow-y-auto">
      <!-- Container to center the panel -->
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full max-w-sm rounded bg-white">
          <DialogTitle>Complete your order</DialogTitle>

          <!-- <slot /> -->

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <!--
        You can render additional buttons to dismiss your dialog by setting your
        `isOpen` state to `false`.
      -->
          <button @click="setIsOpen(false)">Cancel</button>
          <button @click="handleDeactivate">Deactivate</button>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
