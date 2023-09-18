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
    <BaseBackButton />

    <div class="lg:flex mb-12">
      <div class="flex-shrink-0">
        <nuxt-img
          v-if="currentNews.imageCover"
          :src="currentNews.imageCover"
          :alt="currentNews.name"
          class="rounded-lg"
        />
        <img
          v-else
          src="/images/no-image.jpeg"
          alt="no-image"
          class="rounded-lg"
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
        <nuxt-link
          :to="`/news/autor/${currentNews.autor._id}`"
          class="cursor-pointer p-3 pt-0 mt-2"
        >
          <div class="border border-gray-200 rounded-md">
            <UserInfo :user="currentNews.autor" class="pb-3 px-5" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
