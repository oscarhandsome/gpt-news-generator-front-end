<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBookingStore } from '~/store/booking'

// // /?subscription=64e761b2e547816c34836cf0&user=64e7624fe547816c34836cf6&price=10
const route = useRoute()
// const router = useRouter()
// console.log('route', route)
// // const route = useRoute()
// // const { data: mountain } = await useFetch(`https://api.nuxtjs.dev/mountains/${route.params.slug}`)

const { createBooking } = useBookingStore()
const { isLoading } = storeToRefs(useBookingStore())

const { subscription, user, price } = route.query
// console.log('subscription, user, price ', subscription, user, price)

// if (!subscription && !user && !price) router.push('/')

createBooking({
  subscription,
  user,
  price,
})
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <div v-else class="bg-gray-100">
    <div class="bg-white p-6 md:mx-auto">
      <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div>
        <h3
          class="md:text-2xl text-base text-gray-900 font-semibold text-center"
        >
          Payment Done!
        </h3>
        <p class="text-gray-600 my-2">
          Thanks for ordering We appreciate your order, we’re currently
          processing it. So hang tight and we’ll send you confirmation very
          soon!
        </p>
        <dl class="flex mb-2 border-b">
          <dt class="mr-2">Tracking number</dt>
          <dd class="font-bold text-blue-400">51547878755545848512</dd>
        </dl>
        <ul role="list" class="py-5">
          <li class="flex py-2 mb-2 border-b">
            <img
              src="https://random.imagecdn.app/100/100"
              alt="img_desr"
              class="rounded-md"
            />
            <div class="ml-5">
              <h3 class="mb-2"><a href="#">Basic Tee</a></h3>
              <p class="text-gray-400">Charcoal</p>
              <p class="text-gray-400">L</p>
            </div>
            <p class="font-bold ml-2">$36.00</p>
          </li>
          <li class="flex py-2 mb-2 border-b">
            <img
              src="https://random.imagecdn.app/100/100"
              alt="img_desr"
              class="rounded-md"
            />
            <div class="ml-5">
              <h3 class="mb-2"><a href="#">Artwork Tee — Iso Dots</a></h3>
              <p class="text-gray-400">Peach</p>
              <p class="text-gray-400">S</p>
            </div>
            <p class="font-bold ml-2">$36.00</p>
          </li>
        </ul>
        <dl class="flex flex-col border-b pb-2 mb-2">
          <div class="flex justify-between items-center py-2">
            <dt class="text-gray-400">Subtotal</dt>
            <dd class="font-bold">$72.00</dd>
          </div>
          <div class="flex justify-between items-center py-2">
            <dt class="text-gray-400">Shipping</dt>
            <dd class="font-bold">$8.00</dd>
          </div>
          <div class="flex justify-between items-center py-2">
            <dt class="text-gray-400">Taxes</dt>
            <dd class="font-bold">$6.40</dd>
          </div>
          <div class="flex justify-between items-center py-2">
            <dt class="font-bold text-lg">Total</dt>
            <dd class="font-bold">$86.40</dd>
          </div>
        </dl>

        <dl class="flex justify-between">
          <div>
            <dt class="text-lg mb-2">Shipping Address</dt>
            <dd class="text-gray-400">
              <address class="flex flex-col">
                <span class="mb-1">Kristin Watson</span>
                <span class="mb-1">7363 Cynthia Pass</span>
                <span class="mb-1">Toronto, ON N3Y 4H8</span>
              </address>
            </dd>
          </div>
          <div>
            <dt class="text-lg mb-2">Payment Information</dt>
            <dd class="flex flex-col b-2">
              <div class="flex mr-2 m">
                <svg
                  aria-hidden="true"
                  width="36"
                  height="24"
                  viewBox="0 0 36 24"
                  class="oc tm"
                >
                  <rect width="36" height="24" rx="4" fill="#224DBA"></rect>
                  <path
                    d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                    fill="#fff"
                  ></path>
                </svg>
                <p class="ml-2">Visa</p>
              </div>
              <div class="flex flex-col">
                <p class="">Ending with 4242</p>
                <p>Expires 12 / 21</p>
              </div>
            </dd>
          </div>
        </dl>
        <div class="py-10 text-center">
          <nuxt-link
            to="/"
            class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md transition-colors"
          >
            GO BACK
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
