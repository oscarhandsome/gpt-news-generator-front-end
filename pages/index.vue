<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <BaseTitle title="Latest news" />
  <NewsList />
</template>
