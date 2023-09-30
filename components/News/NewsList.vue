<script lang="ts" setup>
import type { News } from 'types'

defineProps<{
  view?: string
  isLoading?: boolean
  items?: News[]
  // errors: string[]
  paginationVisibility: boolean
}>()
</script>

<template>
  <!-- LOADER -->
  <BaseLoader v-if="isLoading" />

  <div v-else>
    <div v-if="items && items.length" class="flex flex-col">
      <div
        class="grid gap-2 lg:gap-4 py-5"
        :class="{
          'sm:grid-cols-2 lg:grid-cols-4': view === 'tile',
          'grid-cols-1': view === 'list',
        }"
      >
        <div v-for="item in items" :key="`news-${item._id}`">
          <NewsListItem :item="item" :view="view" />
        </div>
      </div>

      <div v-if="paginationVisibility" class="text-center py-5">
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
