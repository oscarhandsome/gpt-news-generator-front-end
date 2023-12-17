<script lang="ts" setup>
defineProps<{
  image: string | null
}>()
</script>

<template>
  <div v-if="image" class="flex justify-center items-center w-full h-full">
    <nuxt-img
      :src="image"
      :alt="`image-desc`"
      loading="lazy"
      width="100%"
      height="100%"
      placeholder="/placeholder.png"
      class="rounded-lg min-h-screen object-fill"
    />
  </div>
</template>
