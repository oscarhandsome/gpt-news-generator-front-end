<script lang="ts" setup>
import { ArrowLeftCircleIcon } from '@heroicons/vue/20/solid'
import { formatString } from '@/utils/utils'

const route = useRoute()

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'News', item: '/news' },
  { name: 'About us', item: '/about-us' },
  { name: 'Subscriptions', item: '/subscriptions' },
  { name: 'Faq', item: '/faq' },
]
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbs,
  }),
])

const pageName = computed(() => formatString(route.params.slug))
</script>

<template>
  <div class="flex items-center mb-2 sm:mb-5">
    <BaseButton
      v-if="$route.params.slug || $route.name === 'subscriptions'"
      aria-label="Back to prev page"
      btn-type="button"
      btn-styles="secondary"
      class="mr-2"
      @clicked="$router.go(-1)"
    >
      <ArrowLeftCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      <span class="ml-2 pr-2">Back</span>
    </BaseButton>

    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <nuxt-link
            to="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
              />
            </svg>
            Home
          </nuxt-link>
        </li>
        <li v-if="pageName">
          <div class="flex items-center">
            <svg
              class="w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <div
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white capitalize"
            >
              {{ pageName }}
            </div>
          </div>
        </li>
        <!-- <li aria-current="page">
        <div class="flex items-center">
          <svg
            class="w-3 h-3 text-gray-400 mx-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
            >Latest News</span
          >
        </div>
      </li> -->
      </ol>
    </nav>
  </div>
</template>
