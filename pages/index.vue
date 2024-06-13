<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import {
  ClockIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/20/solid'
import { formatDate } from '@/utils/utils'
import { useNewsStore } from '@/store/news'
import type { INews } from '~/types'
// definePageMeta({
//   middleware: 'auth',
// })
// const view = ref('tile')

const { getAllNews } = useNewsStore()
const { isLoading, newsList } = storeToRefs(useNewsStore())

const newsPerPage = ref(14)
const currentPage = ref(1)

await getAllNews()

const paginate = (array: INews[], newsPerPage: number, currentPage: number) => {
  return array.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage)
}

const newsPartly = computed(() => newsList.value.slice(0, 7))
const newsPartlyShort = computed(() =>
  paginate(newsList.value, newsPerPage.value, currentPage.value),
)

const totalPages = computed(() =>
  Math.round(newsList.value.length / newsPerPage.value),
)

const moveListBack = () => {
  if (currentPage.value <= 1) return
  currentPage.value -= 1
}
const moveListForward = () => {
  if (
    currentPage.value >= Math.round(newsList.value.length / newsPerPage.value)
  )
    return
  currentPage.value += 1
}

// SEO: Page metadata
// Page metadata
const title = ref('GPT Chat News Generator Application news page')
const description = ref(
  `Stay informed and create customized news articles effortlessly with the GPT Chat News Generator Application. Whether it's news about famous personalities, events, or your preferred topics, our platform offers flexible length control to cater to your needs. Embrace the future of news production powered by cutting-edge language models.`,
)
const keywords = ref(
  'news generation, personalized articles, GPT-powered news, instant news creation, famous personalities news, customized content, advanced language models, flexible article length, tailored news experience, AI news generator, chat-based news creation, easy news crafting, future of news, content customization, GPT Chat News App, news on-demand, article creation tool, celebrity news generator, events coverage, innovative news platform',
)

// This will be reactive even you change title/description above
useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: keywords,
    },
  ],
})
</script>

<template>
  <div class="grid md:grid-cols-3 gap-2 md:gap-5 mb-2 xl:mb-5">
    <div class="md:col-span-2">
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div
          v-for="(
            { id, imageCover, slug, name, createdAt, autor, type }, idx
          ) in newsPartly"
          :key="id"
          :class="{ 'col-span-1 sm:col-span-2 xl:col-span-3 mb-5': idx === 0 }"
          class="news-wrapper"
        >
          <nuxt-link :to="`/news/${slug}`" class="flex flex-col">
            <article class="relative">
              <div
                class="flex items-start bg-gray-200 overflow-hidden"
                :class="{
                  'sm:h-72 md:h-60 lg:h-96 xl:h-[400px]': idx === 0,
                  'sm:h-48 xl:h-auto': idx !== 0,
                }"
              >
                <nuxt-img
                  v-if="imageCover"
                  :src="imageCover"
                  :alt="name"
                  loading="lazy"
                  placeholder="/placeholder.png"
                  :modifiers="{ roundCorner: '0:100' }"
                  class="w-full object-cover"
                />
              </div>
              <div
                class="news-info"
                :class="{
                  'absolute bottom-2 xl:-bottom-10 left-2 sm:left-5 text-white mr-2':
                    idx === 0,
                }"
              >
                <div
                  class="inline bg-purple-950 px-1 sm:mb-3 mr-5"
                  :class="{
                    'absolute bottom-[80px] sm:bottom-20 md:bottom-24 lg:bottom-28 left-2 text-white':
                      idx !== 0,
                  }"
                >
                  {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                </div>
                <div class="font-bold lg:text-lg text-sm md:mb-3">
                  {{ idx === 0 ? name : `${name.slice(0, 50)}...` }}
                </div>
                <div class="text-xs sm:text-sm">
                  <div>
                    Author: <strong>{{ autor.name }}</strong>
                  </div>

                  <div class="inline text-xs sm:text-sm">
                    <ClockIcon
                      class="inline h-3 w-3 mr-1"
                      aria-hidden="true"
                      :class="{
                        'text-purple-700': idx !== 0,
                      }"
                    />
                    <time
                      :datetime="createdAt"
                      :class="{ ' text-gray-400': idx !== 0 }"
                    >
                      {{ formatDate(createdAt, 2) }}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Short News -->
    <div
      v-if="newsPartly && newsPartly.length"
      class="relative col-auto flex flex-col xl:gap-1 border border-gray-200 dark:border-gray-600 shadow-sm"
    >
      <div
        class="border-b border-gray-500 dark:border-gray-600 font-bold text-xl p-2"
      >
        Short News
      </div>

      <div
        v-for="({ id, name, slug, createdAt }, idx) in newsPartlyShort"
        :key="id"
        class="text-xs p-1 xl:p-3"
        :class="{
          'border-b border-gray-200 dark:border-gray-600':
            idx !== newsPartlyShort.length - 1,
        }"
      >
        <nuxt-link
          :to="`/news/${slug}`"
          class="hover:text-blue-700 transition-colors"
        >
          <ChevronRightIcon
            class="inline h-4 text-black dark:text-white"
            aria-hidden="true"
          />
          {{ name }}
          <time
            pubdate
            :datetime="formatDate(createdAt, 5)"
            :title="formatDate(createdAt, 2)"
            class="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1"
          >
            <ClockIcon
              class="h-3 w-3 text-purple-800 dark:text-white mr-1"
              aria-hidden="true"
            />
            {{ formatDate(createdAt, 3) }}
          </time>
        </nuxt-link>
      </div>

      <div class="absolute -bottom-[15px] left-1/2 -translate-x-1/2">
        <button
          type="button"
          aria-label="Previous part short news"
          class="border bg-white dark:bg-black border-gray-200 hover:bg-gray-300 active:bg-gray-300 dark:border-gray-400 dark:hover:bg-gray-500 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:cursor-not-allowed transition-colors p-1"
          :disabled="currentPage <= 1"
          @click="moveListBack"
        >
          <ChevronLeftIcon class="block h-4" aria-hidden="true" />
          <span class="hidden">Back</span>
        </button>
        <button
          type="button"
          aria-label="Next part short news"
          class="border bg-white dark:bg-black border-gray-200 hover:bg-gray-300 active:bg-gray-300 dark:border-gray-400 dark:hover:bg-gray-500 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:cursor-not-allowed transition-colors p-1"
          :disabled="currentPage === totalPages"
          @click="moveListForward"
        >
          <ChevronRightIcon class="block h-4" aria-hidden="true" />
          <span class="hidden">Forward</span>
        </button>
      </div>
    </div>
  </div>
  <!-- <NewsList
    :view="view"
    :items="newsList.slice(0, 16)"
    :is-loading="isLoading"
    :pagination-visibility="false"
  /> -->
  <div v-if="!isLoading" class="w-full">
    <TheSocialProof />
    <TheNewsletter />
  </div>
</template>

<style lang="css" scoped>
.news-wrapper {
  overflow: hidden;
}
.news-wrapper img {
  transition: ease 400ms all;
}
.news-wrapper:hover img {
  transform: scale(1.2);
}

.news-info {
  transition: ease 300ms all;
}

.news-wrapper:hover .news-info {
  bottom: 20px;
}
</style>
