<script lang="ts" setup>
import {
  // ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  StarIcon,
} from '@heroicons/vue/20/solid'

import { useGtm } from '@gtm-support/vue-gtm'

// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'
import { formatDate } from '@/utils/utils'

import { useCommonStore } from '@/store/common'

const { setModal } = useCommonStore()

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

const fullImage = ref<null | string>(null)

const route = useRoute()
// const store = useNewsStore()

const { getNews } = useNewsStore()
const { isLoading, errors, currentNews } = storeToRefs(useNewsStore())

const { slug } = route.params
await getNews(slug)
// console.log('store', currentNews)

const formattedCreatedAt = computed(() =>
  formatDate(currentNews.value.createdAt),
)

const toggleFullImageView = (image: string) => {
  fullImage.value = image
  setModal(true)
}

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

// SCHEMA ORG
useSchemaOrg([
  defineArticle({
    '@type': 'NewsArticle',
    headline: currentNews.value.name,
    description: currentNews.value.description,
    image: currentNews.value.imageCover,
    datePublished: currentNews.value.createdAt,
    dateModified: currentNews.value.createdAt,
    // author: currentNews.value.autor.name,
    thumbnailUrl: currentNews.value.imageCover,
    // attaching an author when the identity is an organization
    author: {
      name: currentNews.value.autor.name,
      url: `/news/autor/${currentNews.value.autor.id}`,
    },
  }),
])
</script>

<template>
  <BaseLoader v-if="isLoading" default />
  <div v-else class="mb-12">
    <!-- Details of news {{ $route.params.slug }} -->
    <BaseBackButton class="mb-2 sm:mb-5" />

    <div class="lg:flex">
      <div
        class="relative flex flex-shrink-0 flex-col max-w-lg mx-auto mb-5 lg:mb-0"
      >
        <div
          class="absolute top-0 right-0 font-bold text-xs text-gray-500 text-right lg:text-left bg-white bg-opacity-60 rounded-bl-lg py-2 px-3"
        >
          <!-- 10/06/2023 -->
          {{ formattedCreatedAt }}
        </div>
        <div
          class="flex items-center absolute top-0 left-0 font-bold text-xs text-gray-500 text-right lg:text-left rounded-br-lg py-1 px-2"
        >
          <StarIcon
            v-for="star in currentNews.ratingsAverage"
            :key="star"
            class="inline w-7 h-7 text-amber-500"
            aria-hidden="true"
          />
        </div>

        <div class="w-full mb-2">
          <nuxt-img
            v-if="currentNews.imageCover"
            :src="currentNews.imageCover"
            :alt="currentNews.name"
            loading="lazy"
            width="512"
            height="512"
            placeholder="/placeholder.png"
            class="rounded-lg mx-auto"
          />
          <img
            v-else
            src="/images/no-image.jpeg"
            alt="no-image"
            class="rounded-lg mx-auto"
          />
        </div>
      </div>

      <div class="pb-2 lg:ml-4 xl:ml-6">
        <h1
          class="mb-2 text-2xl xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-white font-chomsky"
        >
          {{ currentNews.name }}
        </h1>
        <p
          class="first-letter:font-chomsky first-letter:text-7xl first-letter:font-bold first-letter:text-black dark:first-letter:text-white first-letter:mr-3 first-letter:float-left font-normal text-gray-700 dark:text-gray-400 mb-2"
          v-html="currentNews.description"
        ></p>

        <div
          v-if="currentNews.images && currentNews.images.length"
          class="flex flex-wrap"
        >
          <div
            v-for="(image, idx) in currentNews.images"
            :key="idx"
            class="flex mb-2 xl:mb-0 mr-2"
          >
            <div class="cursor-pointer" @click="toggleFullImageView(image)">
              <nuxt-img
                v-if="image"
                :src="image"
                :alt="`${currentNews.name}_image_${idx}`"
                loading="lazy"
                width="170"
                height="170"
                placeholder="/placeholder.png"
                class="rounded-lg w-36 h-36 xl:w-48 xl:h-48"
              />
            </div>
          </div>
        </div>

        <div class="border border-gray-300 border-dashed my-2 sm:my-5"></div>

        <nuxt-link
          class="flex justify-between items-center border border-gray-200 dark:border-gray-600 rounded-md transition-colors p-1 sm:p-3 mt-2"
          :class="{
            'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600':
              currentNews.autor && currentNews.autor.id,
          }"
          :to="`/news/autor/${currentNews.autor.id}`"
        >
          <UserInfo :user="currentNews.autor" />
          <ArrowRightCircleIcon
            class="flex-shrink-0 h-10 w-10 text-black dark:text-white"
            aria-hidden="true"
          />
        </nuxt-link>
      </div>
    </div>

    <NewsCommentList
      :comments="currentNews.comments"
      :current-news-id="currentNews.id"
      :ratings-average="currentNews.ratingsAverage"
    />

    <LazyBaseModal>
      <LazyNewsImageView :image="fullImage" />
    </LazyBaseModal>
  </div>
</template>
