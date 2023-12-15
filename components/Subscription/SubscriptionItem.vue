<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useBookingStore } from '~/store/booking' // import the auth store we just created
import { useAuthStore } from '~/store/auth'
import type { Subsription } from '@/types'

defineProps<{
  item: Subsription
  currentSubId: String
}>()

const { getCheckoutSession } = useBookingStore() // use getCheckoutSession action from  auth store
const { checkoutSession, success } = storeToRefs(useBookingStore()) // make checkoutSession, success state reactive with storeToRefs

const { isAuthenticated } = storeToRefs(useAuthStore())

const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const hidden = route.path === '/subscriptions/my-subsriptions'

const chooseSubscription = async (subscriptionId: string) => {
  if (!isAuthenticated.value) {
    router.push('/auth/registration')
    return
  }
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
    class="relative flex flex-col justify-start bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors p-4 sm:p-6 md:p-8"
  >
    <div v-if="item.id === currentSubId" class="absolute top-3 right-2">
      <span class="bg-green-300 dark:bg-green-600 rounded-lg px-2 py-1"
        >Current Plan</span
      >
    </div>
    <p class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
      {{ item.name }}
    </p>
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
      aria-label="Choose Subscription"
      class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm inline-flex justify-center w-full text-center px-5 py-2.5 mt-auto mb-0"
      :class="{
        hidden,
        'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed':
          item.id === currentSubId,
      }"
      :disabled="item.id === currentSubId"
      @click="chooseSubscription(item.id)"
    >
      Get started
    </button>
  </div>
</template>
nuxt
