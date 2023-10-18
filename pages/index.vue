<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'
// definePageMeta({
//   middleware: 'auth',
// })
const view = ref('tile')

const { getAllNews } = useNewsStore()
const { isLoading, errors, newsList } = storeToRefs(useNewsStore())

await getAllNews()

// Page metadata
const title = ref('GPT Chat News Generator Application news page')
const description = ref(
  `Stay informed and create customized news articles effortlessly with the GPT Chat News Generator Application. Whether it's news about famous personalities, events, or your preferred topics, our platform offers flexible length control to cater to your needs. Embrace the future of news production powered by cutting-edge language models.`,
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
  <NewsList
    :view="view"
    :items="newsList.slice(0, 15)"
    :is-loading="isLoading"
    :pagination-visibility="false"
  />
</template>
