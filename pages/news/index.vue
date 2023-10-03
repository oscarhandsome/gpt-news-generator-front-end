<script lang="ts" setup>
import { ListBulletIcon, RectangleGroupIcon } from '@heroicons/vue/20/solid'
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'
import { useSettingsStore } from '@/store/settings'

const { getAllNews } = useNewsStore()
const { isLoading, errors, newsList } = storeToRefs(useNewsStore())

const { settings } = storeToRefs(useSettingsStore())

const changeView = (view: string) => {
  settings.value.view = view
  localStorage.setItem('settings', JSON.stringify({ ...settings.value, view }))
}

await getAllNews()
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
      :items="newsList"
      :is-loading="isLoading"
      :pagination-visibility="true"
    />
  </div>
</template>
