<script lang="ts" setup>
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'

import { ArrowLeftCircleIcon } from '@heroicons/vue/20/solid'

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

const route = useRoute()
const store = useNewsStore()

const { getNews } = useNewsStore() // use authenticateUser action from  auth store
const { isloading, errors, currentNews } = storeToRefs(useNewsStore()) // make isAuthenticated state reactive with storeToRefs

console.log('route.params', route.params)
await getNews(route.params.slug)
console.log('store', currentNews)

onBeforeUnmount(() => {
  currentNews.value = []
  currentNews.value = {}
})
</script>

<template>
  <BaseLoader v-if="isloading" />
  <div v-else>
    <!-- Details of news {{ $route.params.slug }} -->
    <button
      class="flex items-center border border-white hover:bg-black hover:text-white active:bg-black active:text-white transition-colors rounded px-2 mb-2"
      @click="$router.go(-1)"
    >
      <ArrowLeftCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      <span class="ml-2 pr-2">Back</span>
    </button>

    <div class="lg:flex mb-12">
      <div class="flex-shrink-0">
        <nuxt-img
          v-if="currentNews.imageCover"
          :src="currentNews.imageCover"
          :alt="currentNews.name"
          class="rounded-t-lg"
        />
        <img
          v-else
          src="/images/no-image.jpeg"
          alt="no-image"
          class="rounded-t-lg"
        />
      </div>
      <div class="py-2 lg:px-6">
        <div class="text-xs text-gray-500 text-right lg:text-left">
          <!-- 10/06/2023 -->
          {{ currentNews.createdAt }}
        </div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ currentNews.name }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 mb-2">
          {{ currentNews.description }}
        </p>
        <hr />
        <div class="border border-gray-200 rounded-md p-3 pt-0 mt-2">
          <UserInfo :user="currentNews.autor" />
        </div>
      </div>
    </div>
  </div>
</template>
