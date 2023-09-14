<script lang="ts" setup>
// import { ListBulletIcon, RectangleGroupIcon } from '@heroicons/vue/20/solid'
// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'

// definePageMeta({
//   middleware: 'auth',
// })

const view = ref('tile')

const { getMyNews } = useNewsStore()
const { isLoading, errors, newsList } = storeToRefs(useNewsStore())

await getMyNews()
</script>

<template>
  <BaseTitle title="My news" class="mb-5" />

  <div class="flex flex-col justify-center items-center mx-auto">
    <NewsList :view="view" :items="newsList" :is-loading="isLoading" />
  </div>
</template>
