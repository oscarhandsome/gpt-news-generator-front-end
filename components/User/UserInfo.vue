<script lang="ts" setup>
import type { User } from 'types'

// defineProps<User>({
//   user: {
//     // type: String,
//     // default: '',
//     type: Object,
//     default: () => {},
//   },
// })

// const props = defineProps<{
defineProps<{
  user: User | null
  // bar?: number
}>()
// console.log('props', props)
</script>

<template>
  <nuxt-link
    v-if="user && user.id"
    :to="`/news/autor/${user.id}`"
    class="hover:underline active:underline cursor-pointer"
  >
    <div class="flex items-center justify-start space-x-3">
      <!-- 
      :src="`~/assets/images/${user.photo}`"
      https://gpt-chat-news-generator-a4555eba92cd.herokuapp.com/img/users/
      -->
      <!-- https://i.pravatar.cc/100 -->
      <nuxt-img
        class="rounded-full w-9 h-9"
        :src="`${user && user.photo ? user.photo : '/user-placeholder.png'}`"
        :alt="user && user.name ? user.name : 'img_desc'"
        loading="lazy"
        width="36"
        height="36"
        :placeholder="36"
      />
      <div class="space-y-0.5 font-medium dark:text-white text-left">
        <div v-if="user && user.name">{{ user.name }}</div>
        <div v-else class="block h-full w-full bg-gray-500">No image</div>
        <div
          v-if="user && user.position"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ user.position }}
        </div>
        <div
          v-else
          class="block text-sm dark:text-gray-400 h-full w-full bg-gray-500"
        >
          No image
        </div>
      </div>
    </div>
  </nuxt-link>
  <div v-else class="flex items-center justify-start space-x-3">
    <nuxt-img
      class="rounded-full w-9 h-9"
      src="/user-placeholder.png"
      alt="img_desc"
      loading="lazy"
      width="36"
      height="36"
      :placeholder="36"
    />
    <div class="space-y-0.5 font-medium dark:text-white text-left w-full">
      <div class="w-full rounded-lg">Autor not avaliable</div>
      <div class="text-sm dark:text-gray-400 h-full w-full rounded-lg">
        No information
      </div>
    </div>
  </div>
</template>
nuxt
