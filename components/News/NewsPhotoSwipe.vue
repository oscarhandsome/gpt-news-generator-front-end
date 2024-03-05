<script lang="ts" setup>
import VuePictureSwipe from 'vue3-picture-swipe'

const props = defineProps<{ images: string[] }>()

const items = ref(
  props.images.map((item) => {
    return {
      src: item,
      thumbnail: item,
      w: 500,
      h: 500,
      title: 'Will be used for caption',
    }
  }),
)
</script>

<template>
  <vue-picture-swipe
    :items="items"
    :options="{ shareEl: false }"
  ></vue-picture-swipe>
</template>

<style>
.my-gallery {
  display: flex;
}
@media (max-width: 400px) {
  .my-gallery {
    flex-wrap: wrap;
  }
}

.gallery-thumbnail {
  @apply rounded-lg overflow-hidden;
}
</style>
