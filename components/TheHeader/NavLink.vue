<script setup lang="ts">
defineProps({
  link: { type: Object },
})
</script>

<template>
  <nuxt-link
    v-if="link"
    :to="link.to"
    class="block py-2 px-5 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
    :aria-current="`page ${link.name}`"
    >{{ link.name }}
  </nuxt-link>
</template>
