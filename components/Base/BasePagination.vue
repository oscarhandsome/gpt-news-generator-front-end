<script lang="ts" setup>
defineProps<{
  currentPage?: number
  pageCount?: number
  paginationLimit?: number
}>()

// const emit = defineEmits(['updatePage'])
const emits = defineEmits<{
  (e: 'updatePage', id: number): void
}>()

const route = useRoute()

// const total: number = Math.ceil(props.itemsLength / props.itemsPerPage)

const selectPage = (p: number) => emits('updatePage', p)
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm">
      <template v-for="(page, idx) in pageCount" :key="idx">
        <li v-if="page === 1">
          <button
            aria-label="Go to previous page"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
            :disabled="route.query.page === '1'"
            type="button"
            @click="selectPage(route.query.page - 1)"
          >
            Previous
          </button>
        </li>

        <li>
          <button
            aria-label="Go to selected page"
            class="flex items-center justify-center px-3 h-8 leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="[
              page === Number(route.query.page)
                ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
            ]"
            type="button"
            @click="selectPage(page)"
          >
            {{ page }}
          </button>
        </li>

        <li v-if="page === pageCount">
          <button
            aria-label="Go to next page"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
            :disabled="route.query.page === pageCount + ''"
            type="button"
            @click="selectPage(parseInt(route.query.page) + 1)"
          >
            Next
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>
