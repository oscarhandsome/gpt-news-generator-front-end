<script lang="ts" setup>
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'

import { useGtm } from '@gtm-support/vue-gtm'

import {
  // ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/vue/20/solid'

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

const route = useRoute()
// const store = useNewsStore()

const { getNews } = useNewsStore() // use authenticateUser action from  auth store
const { isLoading, errors, currentNews } = storeToRefs(useNewsStore()) // make isAuthenticated state reactive with storeToRefs

const { slug } = route.params
await getNews(slug)
// console.log('store', currentNews)

onBeforeUnmount(() => {
  currentNews.value = []
  currentNews.value = {}
})

// SEO
// Page metadata
// This will be reactive even you change title/description above
// useHead({
//   title: currentNews.value.name,
//   meta: [
//     {
//       name: 'description',
//       content: currentNews.value.description,
//     },
//   ],
// })

useSeoMeta({
  title: () => currentNews.value.name,
  ogTitle: () => currentNews.value.name,
  description: () => currentNews.value.description,
  ogDescription: () => currentNews.value.description,
  ogImage: () => currentNews.value.imageCover,
  twitterCard: 'summary_large_image',
})

// GTM EVENTS
// const gtm = useGtm()

// function triggerEvent() {
//   gtm.trackEvent({
//     event: 'event name',
//     category: 'category',
//     action: 'click',
//     label: 'My custom component trigger',
//     value: 5000,
//     noninteraction: false,
//   })
// }

// onMounted(() => {
//   console.log('triggerEvent', triggerEvent())
//   triggerEvent()
// })
</script>

<template>
  <BaseLoader v-if="isLoading" default />
  <div v-else class="mb-12">
    <!-- Details of news {{ $route.params.slug }} -->
    <BaseBackButton class="mb-2 sm:mb-5" />

    <div class="lg:flex">
      <div class="flex-shrink-0 max-w-lg">
        <nuxt-img
          v-if="currentNews.imageCover"
          :src="currentNews.imageCover"
          :alt="currentNews.name"
          loading="lazy"
          width="512"
          height="512"
          placeholder="/placeholder.png"
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

        <div
          class="flex justify-between items-center border border-gray-200 rounded-md transition-colors p-1 sm:p-3 mt-2"
          :class="{
            'cursor-pointer hover:bg-gray-200 active:bg-gray-200':
              currentNews.autor && currentNews.autor.id,
          }"
        >
          <UserInfo :user="currentNews.autor" />
          <ArrowRightCircleIcon
            class="flex-shrink-0 h-10 w-10 text-black"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
