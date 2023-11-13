<script lang="ts" setup>
definePageMeta({
  layout: 'custom',
})

const route = useRoute()
console.log('route', route.params)
</script>

<template>
  <div class="relative lg:my-5 w-full max-w-lg sm:mx-auto mt-0 sm:shadow-2xl">
    <div
      class="flex flex-col justify-center items-center bg-white p-6 md:mx-auto"
    >
      <svg
        viewBox="0 0 24 24"
        class="text-green-600 w-20 h-20 mx-auto drop-shadow-lg my-6"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div class="text-center">
        <h3
          class="md:text-2xl text-base text-gray-900 font-semibold text-center"
        >
          Registration successful!
        </h3>
        <p class="text-gray-600 my-2">Thank you for joining us!</p>
        <p>
          Have a great day! <br />And please check email to finish Registration
        </p>

        <div class="py-10 r">
          <BaseMainPageButton />
        </div>
      </div>
    </div>
  </div>
</template>
