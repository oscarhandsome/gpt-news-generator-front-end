<script lang="ts" setup>
import { ListBulletIcon, RectangleGroupIcon } from '@heroicons/vue/20/solid'
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'
import { useSettingsStore } from '@/store/settings'

const { getAllNews } = useNewsStore()
const { isLoading, errors, newsList } = storeToRefs(useNewsStore())

const { settings } = storeToRefs(useSettingsStore())

const route = useRoute()
const router = useRouter()

const changeView = (view: string) => {
  settings.value.view = view
  localStorage.setItem('settings', JSON.stringify({ ...settings.value, view }))
}

await getAllNews()

const paginationLimit = ref(settings.value.paginationLimit)
const currentPage = ref(Number(route.query.page) || 1)
const filteredItems = ref(
  newsList.value.slice(
    (currentPage.value - 1) * paginationLimit.value,
    currentPage.value * paginationLimit.value,
  ),
)
const pageCount = ref(Math.ceil(newsList.value.length / paginationLimit.value))

const updatePage = (page: number = 1) => {
  currentPage.value = page
  const currRange = currentPage.value * paginationLimit.value
  filteredItems.value = newsList.value.slice(
    (currentPage.value - 1) * paginationLimit.value,
    currRange,
  )
  window.scrollTo(0, 0)
}

onMounted(() => {
  router.push({ query: { page: route.query.page || 1 } })
})

watch(
  settings,
  (newValue, oldValue) => {
    console.log('newValue, oldValue', newValue, oldValue)
    // if (Number(route.query.page) !== 1)
    //   router.push({ path: route.path, query: { page: 1 } })
    paginationLimit.value = newValue.paginationLimit
    pageCount.value = Math.ceil(newsList.value.length / paginationLimit.value)
    // currentPage.value = Number(route.query.page)
    console.log('paginationLimit.value', paginationLimit.value)
    console.log('pageCount.value', pageCount.value)
    filteredItems.value = newsList.value.slice(
      (currentPage.value - 1) * paginationLimit.value,
      currentPage.value * paginationLimit.value,
    )
  },
  { deep: true },
)

// Page metadata
const title = ref('GPT Chat News Generator Application news page')
const description = ref(
  'Get high-quality, personalized news articles in seconds with the GPT Chat News Generator Application. Craft news on famous people, events, or any topic you desire, with flexible length control. Experience the future of news generation through advanced language models.',
)

// This will be reactive even you change title/description above
useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})
</script>

<template>
  <BaseTitle title="Latest news" />

  <div
    class="flex sm:flex-row flex-col sm:justify-between sm:items-center mb-2 sm:mb-3 md:mb-5"
  >
    <Filter />

    <div class="flex justify-end">
      <button
        class="border border-black hover:bg-black dark:hover:bg-gray-800 hover:text-white rounded p-2 mr-2"
        :class="{
          'bg-black dark:bg-gray-600 text-white': settings.view === 'tile',
        }"
        @click="changeView('tile')"
      >
        <RectangleGroupIcon class="h-5 w-5" />
      </button>
      <button
        class="border border-black hover:bg-black dark:hover:bg-gray-800 hover:text-white rounded p-2"
        :class="{
          'bg-black dark:bg-gray-600 text-white': settings.view === 'list',
        }"
        @click="changeView('list')"
      >
        <ListBulletIcon class="h-5 w-5" />
      </button>
    </div>
  </div>

  <div
    class="flex flex-grow flex-col justify-center items-center mx-auto w-full"
  >
    <NewsList
      :view="settings.view"
      :items="filteredItems"
      :page-count="pageCount"
      :pagination-limit="paginationLimit"
      :current-page="currentPage"
      :is-loading="isLoading"
      :pagination-visibility="true"
      @update-page="updatePage"
    />
  </div>
</template>
