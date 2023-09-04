<script lang="ts" setup>
// import { mapState } from 'pinia'
import { useNewsStore } from '@/store/news'

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

const route = useRoute()
const store = useNewsStore()

store.getNews(route.params.slug)
console.log('store', store.currentNews)
</script>

<template>
  <div>
    <!-- Details of news {{ $route.params.slug }} -->
    <button
      class="text-white border border-white rounded px-3"
      @click="$router.go(-1)"
    >
      Back
    </button>

    <div class="lg:flex border border-red-200 mb-12">
      <div class="flex-shrink-0">
        <nuxt-img
          v-if="store.currentNews.imageCover"
          :src="store.currentNews.imageCover"
          :alt="store.currentNews.name"
          class="rounded-t-lg"
        />
        <img
          v-else
          src="/images/no-image.jpeg"
          alt="no-image"
          class="rounded-t-lg"
        />
      </div>
      <div class="p-6">
        <div class="text-xs text-gray-500">
          <!-- 10/06/2023 -->
          {{ store.currentNews.createdAt }}
        </div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ store.currentNews.name }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ store.currentNews.description }}
        </p>
      </div>
    </div>
  </div>
</template>
