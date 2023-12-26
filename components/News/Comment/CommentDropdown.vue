<script lang="ts" setup>
import {
  TrashIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/vue/20/solid'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

// const { updatePassword } = useAuthStore()
const { user } = storeToRefs(useAuthStore())

const emits = defineEmits(['edit', 'remove'])
const props = defineProps({
  itemId: {
    type: String,
    default: 'id0',
  },
  itemUserId: {
    type: String,
    default: '',
  },
})

const isOpen = ref(false)
const randomId = ref(props.itemId + Math.random())

const edit = () => {
  isOpen.value = false
  emits('edit', { id: props.itemId })
}
const remove = () => {
  isOpen.value = false
  emits('remove', { id: props.itemId })
}
const report = () => {
  console.log('report')
}
const close = () => {
  if (isOpen.value) isOpen.value = false
}
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <ClientOnly>
    <div v-click-outside="close">
      <NewsCommentMenuToggleButton
        :id="randomId"
        @toogle-comment-menu="toggleDropdown"
      />

      <!-- Dropdown menu -->
      <div
        :id="randomId"
        :ref="itemId"
        class="absolute right-0 top-9 z-10 w-36 bg-white rounded divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 shadow-lg"
        :class="{ hidden: !isOpen }"
      >
        <ul
          class="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li>
            <button
              type="button"
              class="flex items-center py-2 px-4 transition-colors w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:opacity-100"
              :class="{
                'hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer':
                  itemUserId === user.id,
              }"
              :disabled="itemUserId !== user.id"
              @click="edit"
            >
              <PencilSquareIcon
                class="flex-shrink-0 h-5 w-5 text-black dark:text-white mr-2"
                aria-hidden="true"
              />
              Edit
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex items-center py-2 px-4 transition-colors w-full bg-red-100 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:opacity-100"
              :class="{
                'hover:bg-red-200 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer':
                  itemUserId === user.id,
              }"
              :disabled="itemUserId !== user.id"
              @click="remove"
            >
              <TrashIcon
                class="flex-shrink-0 h-5 w-5 text-black dark:text-white mr-2"
                aria-hidden="true"
              />
              Remove
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex items-center py-2 px-4 bg-blue-100 hover:bg-blue-200 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer transition-colors w-full"
              @click="report"
            >
              <ExclamationCircleIcon
                class="flex-shrink-0 h-5 w-5 text-black dark:text-white mr-2"
                aria-hidden="true"
              />
              Report
            </button>
          </li>
        </ul>
      </div>
    </div>
  </ClientOnly>
</template>
