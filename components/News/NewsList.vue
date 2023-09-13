<script lang="ts" setup>
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'

const { getAllNews } = useNewsStore() // use authenticateUser action from  auth store
const { isLoading, errors, newsList } = storeToRefs(useNewsStore()) // make isAuthenticated state reactive with storeToRefs

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

// const store = useNewsStore()

// store.getAllNews()
// console.log('store at newsList', store.newsList)
await getAllNews()
</script>

<template>
  <BaseLoader v-if="isLoading" />
  <div v-else>
    <BaseTitle v-if="newsList && newsList.length" title="Latest news" />
    <div
      v-if="newsList && newsList.length"
      class="grid gap-2 lg:gap-4 py-5"
      :class="{
        'sm:grid-cols-2 lg:grid-cols-4': view === 'tile',
        'grid-cols-1': view === 'list',
      }"
    >
      <div v-for="item in newsList" :key="`news-${item.id}`">
        <NewsListItem :item="item" :view="view" />
      </div>

      <div class="text-center py-5">
        <BasePagination />
      </div>
    </div>

    <div
      v-else
      class="flex justify-center items-center text-center text-2xl font-bold mb-5 h-80"
    >
      News not exist
    </div>
  </div>
</template>
