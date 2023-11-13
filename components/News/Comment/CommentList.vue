<script lang="ts" setup>
import type { Comment } from 'types'

const props = defineProps<{ comments: Comment[]; currentNewsId: string }>()
console.log('currentNewsId', props.currentNewsId)
</script>

<template>
  <section class="bg-white dark:bg-gray-900 py-4 lg:py-10 antialiased">
    <div class="px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion (20)
        </h2>
      </div>

      <FormNewsComment :currentNewsId="props.currentNewsId" />

      <template
        v-if="comments && comments.length"
        v-for="item in comments"
        :key="item.id"
      >
        <NewsCommentListItem v-if="item" :item="item" />
      </template>
    </div>
  </section>
</template>
