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
      :src="`~/assets/images/${user.photo}`" -->
    <img
      v-if="user.photo"
      class="rounded-full w-9 h-9"
      :src="`${user.photo}`"
      :alt="user.name"
    />
    <img v-else src="https://i.pravatar.cc/100" alt="any" />
    <div class="space-y-0.5 font-medium dark:text-white text-left">
      <div>{{ user.name }}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Developer at Open AI
      </div>
    </div>
  </figcaption>
</template>
