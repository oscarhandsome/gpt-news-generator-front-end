<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useSubscriptionStore } from '~/store/subsriptions'

// import { CheckIcon } from '@heroicons/vue/24/solid'

// definePageMeta({
//   layout: 'custom',
//   // middleware: 'auth',
// })

const { getSubscriptions, getMySubscriptions } = useSubscriptionStore()
const { subscriptions, mySubscription } = storeToRefs(useSubscriptionStore())

// const router = useRouter()

await getSubscriptions()
await getMySubscriptions()

console.log('mySubscription', mySubscription.value)
const currentSubId = ref('')
if (mySubscription.value && mySubscription.value.length)
  currentSubId.value = mySubscription.value[0].id
</script>

<template>
  <div class="flex justify-between">
    <SubscriptionList
      :subscriptions="subscriptions"
      :current-sub-id="currentSubId"
    />
  </div>
</template>
