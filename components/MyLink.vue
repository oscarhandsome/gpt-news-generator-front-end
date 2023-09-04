<template>
  <CustomNavLink
    :to="to"
    class="block py-2 px-3 text-gray-500 hover:bg-slate-300 hover:text-white transition rounded"
    >{{ title }}</CustomNavLink
  >
</template>
<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>
