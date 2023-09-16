<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'

const route = useRoute()

const view = ref('tile')

const { getNewsByAutorId } = useNewsStore()
const { isLoading, errors, newsList } = storeToRefs(useNewsStore())

await getNewsByAutorId(route.params.id)
</script>

<template>
  <div class="flex items-center justify-between">
    <BaseTitle title="News by user: ****" class="mb-5" />
    <p>
      Total news:
      <span class="ml-2">{{ newsList.length }}</span>
    </p>
  </div>

  <div class="flex flex-col justify-center items-center mx-auto">
    <NewsList
      :view="view"
      :items="newsList"
      :is-loading="isLoading"
      :errors="errors"
    />
  </div>
</template>
