<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/store/stats'

const { getInfo } = useStatsStore()
const { info } = storeToRefs(useStatsStore())

await getInfo()
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 sm:rounded-lg mt-5">
    <section class="py-4 px-4 mx-auto w-full lg:py-8 lg:px-6">
      <div class="mx-auto max-w-screen-md sm:text-center">
        <h1
          class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white"
        >
          Sign up to get news!
        </h1>
        <p>
          Transform your news experience with the GPT Chat News Generator
          Application. Instantly create personalized news articles on famous
          people, events, or any topic you choose. Tailor the length of your
          articles to suit your preferences. Join us in shaping the future of
          news generation through advanced language models.
        </p>
      </div>

      <div class="max-w-screen-xl mx-auto text-center">
        <dl
          class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white"
        >
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">
              {{ info.news }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">news</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">
              {{ info.contributors }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              contributors
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">
              {{ info.organizations }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              organizations
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>
