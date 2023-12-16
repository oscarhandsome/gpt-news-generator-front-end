<script lang="ts" setup>
// const isFeedbackModal = ref(false)

// function toggleFeedback() {
//   isFeedbackModal.value = !isFeedbackModal.value
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
    <!-- <BaseFeedbackButton @toggle-feedback-btn="toggleFeedback" />

    <LazyBaseModal>
      <TheFeedback />
    </LazyBaseModal> -->
  </div>
</template>
