<script lang="ts" setup>
import {
  TrashIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/vue/20/solid'

defineProps({
  itemId: String,
  dropdownVisibility: Boolean,
})
</script>

<template>
  <!-- Dropdown menu -->
  <div
    :id="itemId + Math.random()"
    :ref="itemId"
    class="absolute right-0 top-9 z-10 w-36 bg-white rounded divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 shadow-lg"
    :class="{ hidden: !dropdownVisibility }"
  >
    <ul
      class="py-1 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownMenuIconHorizontalButton"
    >
      <li>
        <a
          href="#"
          class="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <PencilSquareIcon
            class="flex-shrink-0 h-5 w-5 text-black dark:text-white mr-2"
            aria-hidden="true"
          />
          Edit
        </a>
      </li>
      <li>
        <a
          href="#"
          class="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <TrashIcon
            class="flex-shrink-0 h-5 w-5 text-black dark:text-white mr-2"
            aria-hidden="true"
          />
          Remove
        </a>
      </li>
      <li>
        <a
          href="#"
          class="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <ExclamationCircleIcon
            class="flex-shrink-0 h-5 w-5 text-black dark:text-white mr-2"
            aria-hidden="true"
          />
          Report
        </a>
      </li>
    </ul>
  </div>
</template>
