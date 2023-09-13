<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    v-if="text"
    class="text-red-500 bg-red-100 border border-red-500 rounded-lg px-5 py-2"
  >
    {{ text }}
  </div>
</template>
