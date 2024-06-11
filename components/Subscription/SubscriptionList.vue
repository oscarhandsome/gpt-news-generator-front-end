<script lang="ts" setup>
import type { ISubsription } from '@/types'

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
  subscriptions: ISubsription[]
  currentSubId?: string
}>()
</script>

<template>
  <div class="flex-1 flex-col">
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
    >
      <SubscriptionItem
        v-for="subscription in subscriptions"
        :key="subscription.id"
        :item="subscription"
        :current-sub-id="currentSubId"
      />
    </div>
  </div>
</template>
nuxt
