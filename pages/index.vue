<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'
definePageMeta({
  middleware: 'auth',
})
const view = ref('tile')

const { getAllNews } = useNewsStore()
const { isLoading, errors, newsList } = storeToRefs(useNewsStore())

await getAllNews()
</script>

<template>
  <NewsList :view="view" :items="newsList" :is-loading="isLoading" />
</template>
