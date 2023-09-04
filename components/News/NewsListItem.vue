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
    class="block relative bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full"
    :class="{ 'max-w-sm': view === 'tile' }"
  >
    <nuxt-link
      :to="`/news/${item.id}`"
      class="cursor-pointer"
      :class="{ flex: view === 'list' }"
    >
      <div>
        <nuxt-img
          v-if="item.imageCover"
          :src="item.imageCover"
          :alt="item.name"
          class="rounded-t-lg"
        />
        <img
          v-else
          src="/images/no-image.jpeg"
          alt="no-image"
          class="rounded-t-lg"
        />
      </div>
      <div class="p-6">
        <div class="absolute right-2 bottom-1 text-xs text-gray-500">
          <!-- 10/06/2023 -->
          {{ item.createdAt }}
        </div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
        >
          {{ item.name }}
        </h5>
        <p
          class="font-normal text-gray-700 dark:text-gray-400 break-all truncate"
          v-html="item.description"
        ></p>
      </div>
    </nuxt-link>

    <UserInfo :user="item.autor" class="pb-5 px-5" />
  </div>
</template>
