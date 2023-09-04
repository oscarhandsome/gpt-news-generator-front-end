<script lang="ts" setup>
// import { mapState } from 'pinia'
import { useNewsStore } from '@/store/news'

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

const store = useNewsStore()

store.getAllNews()
// console.log('store at newsList', store.newsList)
</script>

<template>
  <div
    class="grid gap-2 lg:gap-4 py-5"
    :class="{
      'sm:grid-cols-2 lg:grid-cols-4': view === 'tile',
      'sm:grid-cols-1 ': view === 'list',
    }"
  >
    <div v-for="item in store.newsList" :key="`news-${item.id}`">
      <NewsListItem :item="item" :view="view" />
    </div>
  </div>

  <div class="text-center py-5">
    <BasePagination />
  </div>
</template>
