<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'

// components/MyToast.vue
const props = defineProps<{
  title: string
  message?: string
  type: 'info' | 'error'
}>()

const { isHovered, isActive, timer, duration, click, close } =
  useNinjaToasterState()

const { percent, endAt, closeIn } = useNinjaToasterProgress()
</script>

<template>
  <div
    class="relative sm:border sm:rounded-lg sm:shadow p-4"
    :class="[
      props.type === 'info' &&
        'bg-white text-black dark:bg-white dark:text-white sm:border-gray-200',
      props.type === 'error' && 'bg-rose-100 text-rose-500 sm:border-rose-600',
    ]"
  >
    <p>{{ props.title }}</p>
    <p v-if="props.message">{{ props.message }}</p>
    <button
      aria-label="Close toast"
      class="absolute top-1 right-1"
      type="button"
      @click="close()"
    >
      <XCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
#nt-container {
  /* make container fit the screen */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;

  /* position the toasts using flexbox */
  display: flex;

  /**
   * position all toasts in bottom of the screen 
   * - use "flex-direction: column;" to position in top screen
   */
  flex-direction: column-reverse;

  /**
   * align all toasts to the center
   * - use "align-items: start" to aling to the left
   * - use "align-items: end" to aling to the right
   */
  align-items: center;

  /* add some space between toasts and screen */
  padding: 2rem;
  gap: 1rem;
}

#nt-container [role='alert'] {
  /* allow toasts to be interactive */
  pointer-events: auto;

  /* add styles to toasts */
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  #nt-container {
    /* fit toasts to screen on mobile */
    padding: 0;
  }
}
</style>
