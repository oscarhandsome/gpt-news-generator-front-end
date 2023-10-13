<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  view: {
    type: String,
    default: 'tile',
  },
})
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
      <div class="flex shrink-0">
        <nuxt-img
          v-if="item.imageCover"
          :src="item.imageCover"
          :alt="item.name"
          loading="lazy"
          width="289"
          height="289"
          placeholder="/placeholder.png"
          :modifiers="{ roundCorner: '0:100' }"
          class="w-full rounded-t-lg hover:scale-105 active:scale-110 transition-transform"
          :class="{ 'h-32 rounded-b-lg': view === 'list' }"
        />
        <img
          v-else
          src="/images/no-image.jpeg"
          alt="no-image"
          class="w-full rounded-t-lg"
          :class="{ 'h-32 rounded-b-lg': view === 'list' }"
        />
      </div>
      <div class="p-2 sm:px-5">
        <div class="absolute right-2 bottom-1 text-xs text-gray-500">
          <!-- 10/06/2023 -->
          {{ item.createdAt }}
        </div>
        <h5
          class="text-base sm:text-lg lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ item.name.substring(0, 18) + '...' }}
        </h5>
        <p
          class="font-normal text-gray-700 dark:text-gray-400 break-all mt-2"
          v-html="item.description.substring(0, 60) + '...'"
        ></p>
      </div>
    </nuxt-link>

    <nuxt-link :to="`/news/autor/${item.autor.id}`">
      <UserInfo
        :user="item.autor"
        class="py-1 pb-5 sm:py-5 px-2 sm:px-5 mt-auto bg-gray-100 hover:underline"
      />
    </nuxt-link>
  </div>
</template>
