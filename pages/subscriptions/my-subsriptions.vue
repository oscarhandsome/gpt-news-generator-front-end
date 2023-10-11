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

  <div>
    <div class="my-5">
      <span class="bg-green-300 rounded-lg px-2 py-1">Current Plan</span>
    </div>
    {{ store.mySubscription[0].name }}
    <br />
    {{ store.mySubscription[0].description }}
  </div>
</template>
