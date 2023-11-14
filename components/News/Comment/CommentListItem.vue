<script lang="ts" setup>
import type { Comment } from 'types'
import { formatDate } from '@/utils/utils'

// const props = defineProps<Comment>()
const props = defineProps<{ item: Comment }>()

const dropdownVisibility = ref(false)

const toggleDropdown = (value: string) => {
  console.log('toggleDropdown', value)
  dropdownVisibility.value = !dropdownVisibility.value
}

const formattedCreatedAt = computed(() => formatDate(props.item.createdAt, 1))
</script>

<template>
  <article class="py-3 text-base bg-white rounded-lg dark:bg-gray-900">
    <footer class="relative flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <nuxt-img
            v-if="item.user && item.user.photo"
            :src="item.user.photo"
            :alt="item.user.name"
            loading="lazy"
            width="30"
            height="30"
            placeholder="/placeholder.png"
            :modifiers="{ roundCorner: '0:100' }"
            class="mr-2 w-6 h-6 rounded-full"
          />

          {{ item.user && item.user.name ? item.user.name : '' }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate datetime="2022-02-08" title="February 8th, 2022">
            <!-- Feb. 8, 2022 -->
            {{ formattedCreatedAt }}
          </time>
        </p>
      </div>
      <button
        :id="item.id"
        :data-dropdown-toggle="item.id"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        @click="toggleDropdown(`dropdownComment${item.id}Button`)"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
        <span class="sr-only">Comment settings</span>
      </button>
      <!-- Dropdown menu -->
      <NewsCommentDropdown
        :itemId="item.id"
        :dropdownVisibility="dropdownVisibility"
      />
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      {{ item.comment }}
    </p>
    <!-- <div class="flex items-center mt-4 space-x-4">
      <button
        type="button"
        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div> -->
  </article>
  <!-- <article
    class="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
  >
    <footer class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <img
            class="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Jese Leos"
          />Jese Leos
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate datetime="2022-02-12" title="February 12th, 2022"
            >Feb. 12, 2022</time
          >
        </p>
      </div>
      <button
        id="dropdownComment2Button"
        data-dropdown-toggle="dropdownComment2"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
        <span class="sr-only">Comment settings</span>
      </button>
      
      <NewsCommentDropdown />
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      Much appreciated! Glad you liked it ☺️
    </p>
    <div class="flex items-center mt-4 space-x-4">
      <button
        type="button"
        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div>
  </article> -->
  <!-- <article
    class="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
  >
    <footer class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <img
            class="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie Green"
          />Bonnie Green
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate datetime="2022-03-12" title="March 12th, 2022"
            >Mar. 12, 2022</time
          >
        </p>
      </div>
      <button
        id="dropdownComment3Button"
        data-dropdown-toggle="dropdownComment3"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
        <span class="sr-only">Comment settings</span>
      </button>
      
      <NewsCommentDropdown />
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      The article covers the essentials, challenges, myths and stages the UX
      designer should consider while creating the design strategy.
    </p>
    <div class="flex items-center mt-4 space-x-4">
      <button
        type="button"
        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div>
  </article> -->
  <!-- <article
    class="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
  >
    <footer class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <img
            class="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
            alt="Helene Engels"
          />Helene Engels
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate datetime="2022-06-23" title="June 23rd, 2022"
            >Jun. 23, 2022</time
          >
        </p>
      </div>
      <button
        id="dropdownComment4Button"
        data-dropdown-toggle="dropdownComment4"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
      </button>

      <NewsCommentDropdown />
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      Thanks for sharing this. I do came from the Backend development and
      explored some of the tools to design my Side Projects.
    </p>
    <div class="flex items-center mt-4 space-x-4">
      <button
        type="button"
        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div>
  </article> -->
</template>
