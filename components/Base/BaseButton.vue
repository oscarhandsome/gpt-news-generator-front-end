<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    default: '/',
  },
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <nuxt-link
    :to="to"
    class="hover:bg-gray-50 dark:border-gray-700 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-1 dark:hover:bg-gray-600 focus:outline-none dark:focus:ring-gray-800 transition"
    :class="{
      'border border-white  bg-slate-300 text-black': active,
      'text-white': !active,
    }"
  >
    <slot />
  </nuxt-link>
</template>
