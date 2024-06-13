<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/store/common'

const { setModal, setModalFeedback } = useCommonStore()
const { getFeedbackStatus } = storeToRefs(useCommonStore())

function toggleFeedbackModal() {
  setModalFeedback(true)
  setModal(true)
}
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
    <LazyTheCookie />
    <TheFooter class="mt-auto mb-0" />

    <LazyBaseUpButton />
    <LazyBaseFeedbackButton @toggle-feedback-btn="toggleFeedbackModal" />

    <LazyBaseModal>
      <LazyTheFeedback v-if="getFeedbackStatus" />
      <LazyNewsImageView />
    </LazyBaseModal>
  </div>
</template>
