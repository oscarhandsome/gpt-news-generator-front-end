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
  <NewsList
    :view="view"
    :items="newsList.slice(0, 15)"
    :is-loading="isLoading"
    :pagination-visibility="false"
  />
  <div v-if="!isLoading" class="w-full">
    <TheSocialProof />
    <TheNewsletter />
  </div>
</template>
