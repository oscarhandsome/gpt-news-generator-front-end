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
</script>

<template>
  <BaseTitle title="Latest news" />

  <div class="flex justify-between items-center mb-2 sm:mb-3 md:mb-5">
    <Filter />

    <div class="flex justify-end">
      <button
        class="border border-black hover:bg-black hover:text-white rounded p-2 mr-2"
        :class="{ 'bg-black text-white': settings.view === 'tile' }"
        @click="changeView('tile')"
      >
        <RectangleGroupIcon class="h-5 w-5" />
      </button>
      <button
        class="border border-black hover:bg-black hover:text-white rounded p-2"
        :class="{ 'bg-black text-white': settings.view === 'list' }"
        @click="changeView('list')"
      >
        <ListBulletIcon class="h-5 w-5" />
      </button>
    </div>
  </div>

  <div class="flex flex-col justify-center items-center mx-auto">
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
