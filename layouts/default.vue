<script lang="ts" setup>
// // import { storeToRefs } from 'pinia'
// import { useCommonStore } from '@/store/common'

// const { setModal } = useCommonStore()
// // const { isOpen } = storeToRefs(useCommonStore())

// const isFeedbackModal = ref(false)

// function toggleFeedbackModal() {
//   isFeedbackModal.value = !isFeedbackModal.value
//   setModal(isFeedbackModal.value)
// }
</script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
    <TheHeader />
    <main class="flex flex-col flex-grow">
      <div
        class="container flex flex-col flex-grow w-full mx-auto px-2 sm:px-0"
      >
        <TheBreadcrumb />
        <slot />
      </div>
    </main>
    <TheCookie />
    <TheFooter class="mt-auto mb-0" />

    <BaseUpButton />
    <!-- <BaseFeedbackButton @toggle-feedback-btn="toggleFeedbackModal" />

    <LazyBaseModal>
      <TheFeedback />
    </LazyBaseModal> -->
  </div>
</template>
