<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <BaseTitle title="Generate your news!" class="mb-5" />

  <FormNewsCreate class="mb-10" />
</template>
