<script lang="ts" setup>
import type { NavLink } from '@/types'
// defineProps({
//   path: {
//     type: String,
//     default: '',
//   },
// })
defineProps<NavLink>()
</script>

<template>
  <nuxt-link :to="to" class="text-blue-500 underline"><slot /></nuxt-link>
</template>
