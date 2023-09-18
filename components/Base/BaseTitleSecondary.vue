<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <h2 class="text-1xl lg:text-2xl font-bold">{{ title }}</h2>
</template>
