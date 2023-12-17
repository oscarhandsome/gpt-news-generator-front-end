<script lang="ts" setup>
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/vue/20/solid'
import { formatDate } from '../../utils/utils'

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  view: {
    type: String,
    default: 'tile',
  },
})

const formattedCreatedAt = computed(() => formatDate(props.item.createdAt))
</script>

<template>
  <div
    class="flex flex-col grow relative bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
  >
    <nuxt-link
      :to="`/news/${item.slug}`"
      :class="{ flex: view === 'list' }"
      class="cursor-pointer"
    >
      <div class="flex shrink-0 relative">
        <nuxt-img
          v-if="item.imageCover"
          :src="item.imageCover"
          :alt="item.name"
          loading="lazy"
          width="289"
          height="289"
          placeholder="/placeholder.png"
          :modifiers="{ roundCorner: '0:100' }"
          class="w-full rounded-t-lg"
          :class="{ 'h-32 rounded-b-lg': view === 'list' }"
        />
        <img
          v-else
          src="/images/no-image.jpeg"
          alt="no-image"
          class="w-full rounded-t-lg"
          :class="{ 'h-32 rounded-b-lg': view === 'list' }"
        />

        <!-- TODO: MOVE UP from A tag  -->
        <!-- <div
          class="hidden absolute bottom-0 right-0 bg-white bg-opacity-60 p-1"
        >
          <button
            aria-label="Like News"
            class="text-black hover:opacity-60 active:opacity-60 transition-opacity rounded-lg p-1"
            type="button"
          >
            <HandThumbUpIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
          </button>
          <button
            aria-label="Dislike News"
            class="text-black hover:opacity-60 active:opacity-60 transition-opacity rounded-lg p-1"
            type="button"
          >
            <HandThumbDownIcon
              class="flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div> -->
      </div>
      <div class="p-2 sm:px-5">
        <div class="absolute right-2 bottom-1 text-xs text-gray-500">
          <!-- 10/06/2023 -->
          {{ formattedCreatedAt }}
        </div>
        <p
          class="text-base sm:text-lg lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ item.name.substring(0, 18) + '...' }}
        </p>
        <p
          class="font-normal text-gray-700 dark:text-gray-400 break-all mt-2"
          v-html="item.description.substring(0, 60) + '...'"
        ></p>
      </div>
      <!-- <div
        class="absolute top-0 right-0 bg-white bg-opacity-60 rounded-bl-lg px-2"
      >
        {{ item.type }}
      </div> -->
    </nuxt-link>

    <nuxt-link :to="`/news/autor/${item.autor.id}`">
      <UserInfo
        :user="item.autor"
        class="py-1 pb-5 sm:py-5 px-2 sm:px-5 mt-auto hover:bg-gray-200 active:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:active:bg-gray-700 rounded-b-lg"
      />
    </nuxt-link>
  </div>
</template>
