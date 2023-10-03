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
  <div class="flex-1 flex-col">
    <BaseBackButton class="mb-2 sm:mb-5" />
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
    >
      <SubscriptionItem
        v-for="subscription in subscriptions"
        :key="subscription._id"
        :item="subscription"
      />
    </div>
  </div>
</template>
