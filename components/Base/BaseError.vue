<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <transition name="top-to-bottom" mode="out-in">
    <div
      v-if="text"
      class="fixed top-0 left-1/2 -translate-x-1/2 text-red-500 bg-red-100 border border-red-500 rounded-lg px-5 py-2"
    >
      {{ text }}
    </div>
  </transition>
</template>

<style>
.top-to-bottom-leave-active {
  transition: all 0.5s ease-out;
}
.top-to-bottom-leave-to {
  transform: translateY(-300%) translateX(-50%);
}

.top-to-bottom-enter-active {
  transition: all 0.5s ease-out;
}
.top-to-bottom-enter-from {
  transform: translateY(-300%) translateX(-50%);
}
</style>
