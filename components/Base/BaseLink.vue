<script lang="ts" setup>
defineProps({
  path: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <nuxt-link :to="path" class="text-blue-500 underline"><slot /></nuxt-link>
</template>
