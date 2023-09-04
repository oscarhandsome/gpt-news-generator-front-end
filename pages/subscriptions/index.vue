<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useBookingStore } from '~/store/booking' // import the auth store we just created
import { useSubscriptionStore } from '~/store/subsriptions'

// import { CheckIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'custom',
  middleware: 'auth',
})

const { getCheckoutSession } = useBookingStore() // use getCheckoutSession action from  auth store
const { checkoutSession, success } = storeToRefs(useBookingStore()) // make checkoutSession, success state reactive with storeToRefs

const { getSubscriptions } = useSubscriptionStore()
const { subscriptions } = storeToRefs(useSubscriptionStore())

const isLoading = ref(false)

// const router = useRouter()

const chooseSubscription = async (subscriptionId: string) => {
  isLoading.value = true
  // 1) Get checkout session from API
  // 2) Create checkout form + share credit cards
  console.log('value', subscriptionId)

  await getCheckoutSession(subscriptionId)
  if (checkoutSession && success) {
    // $toast.show('success!')
    // setTimeout(() => router.push('/news/create'), 2000)
  }
  isLoading.value = false
}

await getSubscriptions()
</script>

<template>
  <div class="flex justify-between">
    <SubscriptionList :subscriptions="subscriptions" />
  </div>
</template>
