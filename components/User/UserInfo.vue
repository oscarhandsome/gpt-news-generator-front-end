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
  user: User
  // bar?: number
}>()
// console.log('props', props)
</script>

<template>
  <figcaption
    v-if="user && user.photo && user.name"
    class="flex items-center justify-start space-x-3 mt-2"
  >
    <!-- 
      :src="`~/assets/images/${user.photo}`"
    https://gpt-chat-news-generator-a4555eba92cd.herokuapp.com/img/users/
    -->
    <!-- https://i.pravatar.cc/100 -->
    <nuxt-img
      v-if="user.photo"
      class="rounded-full w-9 h-9"
      :src="`${user.photo}` || './user-placeholder.png'"
      :alt="user.name"
      loading="lazy"
      width="36"
      height="36"
      :placeholder="36"
    />
    <div class="space-y-0.5 font-medium dark:text-white text-left">
      <div>{{ user.name }}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Developer at Open AI
      </div>
    </div>
  </figcaption>
</template>
