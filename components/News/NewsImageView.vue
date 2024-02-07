<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/store/common'

// const { setModal } = useCommonStore()
const { fullImageUrl } = storeToRefs(useCommonStore())

// defineProps<{
//   image: string | null
// }>()
</script>

<template>
  <div
    v-if="fullImageUrl"
    class="flex justify-center items-center w-screen h-screen overflow-hidden"
  >
    <nuxt-img
      :src="fullImageUrl"
      :alt="`image-desc`"
      loading="lazy"
      width="512px"
      height="512px"
      placeholder="/placeholder.png"
      class="w-auto max-h-dvh h-screen"
    />
  </div>
</template>
