<script lang="ts" setup>
import type { Subsription } from 'types'

defineProps<{
  item: Subsription
}>()

const { chooseSubscription } = inject('subscriptions')

const chooseitem = (id: string) => chooseSubscription(id)
</script>

<template>
  <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
    {{ item.name }}
  </h5>
  <div class="flex items-baseline text-gray-900 dark:text-white">
    <span class="text-3xl font-semibold">$</span>
    <span class="text-5xl font-extrabold tracking-tight">{{ item.price }}</span>
    <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
      >/month</span
    >
  </div>
  <ul
    v-if="item.features && item.features.length"
    role="list"
    class="space-y-5 my-7"
  >
    <li
      v-for="(feature, idx) in item.features"
      :key="idx"
      class="flex space-x-3 items-center"
    >
      <svg
        class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
        />
      </svg>
      <span
        class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
        >{{ feature }}</span
      >
    </li>
  </ul>
  <button
    type="button"
    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
    @click="chooseitem(item._id)"
  >
    Get started
  </button>
</template>
