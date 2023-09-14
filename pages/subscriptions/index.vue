<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useSubscriptionStore } from '~/store/subsriptions'

// import { CheckIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'custom',
  // middleware: 'auth',
})

const { getSubscriptions } = useSubscriptionStore()
const { subscriptions } = storeToRefs(useSubscriptionStore())

// const router = useRouter()

await getSubscriptions()
</script>

<template>
  <div class="flex justify-between">
    <SubscriptionList :subscriptions="subscriptions" />
  </div>
</template>
