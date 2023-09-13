<script lang="ts" setup>
import { useSubscriptionStore } from '@/store/subsriptions'

const store = useSubscriptionStore()

await store.getMySubscriptions()
</script>

<template>
  <BaseTitle title="My Subscriptions" class="mb-5" />

  <div class="flex">
    <SubscriptionList :subscriptions="store.mySubscription" />
  </div>
</template>
