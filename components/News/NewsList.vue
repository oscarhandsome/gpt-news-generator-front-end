<script lang="ts" setup>
import type { News } from 'types'

defineProps<{
  view?: string
  isLoading?: boolean
  items?: News[]
  // errors: string[]
  paginationVisibility?: boolean
}>()

const router = useRouter()
const route = useRoute()

const updatePage = (page: number) => {
  router.push({
    path: route.path,
    query: { page },
  })
}
</script>

<template>
  <!-- LOADER -->
  <BaseLoader v-if="isLoading" />

  <div v-else class="w-full">
    <div v-if="items && items.length" class="flex flex-col w-full">
      <div
        class="grid gap-2 sm:gap-3 lg:gap-4 xl:gap-5"
        :class="{
          'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5':
            view === 'tile',
          'grid-cols-1 sm:grid-cols-2 ': view === 'list',
        }"
      >
        <div
          v-for="item in items"
          :key="`news-${item.id}`"
          class="flex flex-col"
        >
          <NewsListItem :item="item" :view="view" />
        </div>
      </div>

      <div v-if="paginationVisibility" class="text-center py-5">
        <BasePagination
          :current-page="1"
          :total-pages="items.length"
          :items-per-page="15"
          @updatePage="updatePage"
        />
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
