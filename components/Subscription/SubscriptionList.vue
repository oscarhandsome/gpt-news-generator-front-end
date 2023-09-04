<script lang="ts" setup>
import type { Subsription } from 'types'

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
  subscriptions: Subsription[]
}>()
</script>

<template>
  <div
    v-for="subscription in subscriptions"
    :key="subscription._id"
    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <SubscriptionItem :item="subscription" />
  </div>
</template>
