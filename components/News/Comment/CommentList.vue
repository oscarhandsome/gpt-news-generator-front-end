<script lang="ts" setup>
import type { IComment } from '@/types'

defineProps<{
  comments: IComment[]
  currentNewsId: string
  ratingsAverage: number
}>()
</script>

<template>
  <section class="bg-white dark:bg-gray-900 py-4 lg:py-10 antialiased">
    <div class="px-0">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion
          {{ comments && comments.length ? `(${comments.length})` : '' }}
        </h2>

        <NewsCommentRatring
          :current-news-id="currentNewsId"
          :ratings-average="ratingsAverage"
        />
      </div>

      <FormNewsComment :current-news-id="currentNewsId" />

      <div class="w-full">
        <NewsCommentListItem
          v-for="item in comments"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>
