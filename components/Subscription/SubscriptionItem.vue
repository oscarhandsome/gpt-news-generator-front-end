<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useBookingStore } from '~/store/booking' // import the auth store we just created
import type { Subsription } from 'types'

defineProps<{
  item: Subsription
}>()

const { getCheckoutSession } = useBookingStore() // use getCheckoutSession action from  auth store
const { checkoutSession, success } = storeToRefs(useBookingStore()) // make checkoutSession, success state reactive with storeToRefs

const isLoading = ref(false)
const route = useRoute()
const hidden = route.path === '/subscriptions/my-subsriptions'

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
</script>

<template>
  <div
    class="flex flex-col justify-start w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 transition-colors"
  >
    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
      {{ item.name }}
    </h5>
    <div class="flex items-baseline text-gray-900 dark:text-white">
      <span class="text-3xl font-semibold">$</span>
      <span class="text-5xl font-extrabold tracking-tight">{{
        item.price
      }}</span>
      <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
        >/month</span
      >
    </div>
    <ul
      v-if="item.features && item.features.length"
      role="list"
      class="space-y-5 my-7"
    >
      <li
        v-for="(feature, idx) in item.features"
        :key="idx"
        class="flex space-x-3 items-center"
      >
        <svg
          class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        <span
          class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
          >{{ feature }}</span
        >
      </li>
    </ul>
    <button
      type="button"
      class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm inline-flex justify-center w-full text-center px-5 py-2.5 mt-auto mb-0"
      :class="{ hidden }"
      @click="chooseSubscription(item._id)"
    >
      Get started
    </button>
  </div>
</template>
