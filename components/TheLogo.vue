<script lang="ts" setup>
const props = defineProps({
  small: {
    type: Boolean,
    default: false,
  },
})

const footerStyles = computed(() =>
  props.small ? 'text-lg lg:text-2xl' : 'tex-base md:text-2xl lg:text-4xl',
)
</script>

<template>
  <NuxtLink to="/">
    <div class="logo lg:py-5" :class="footerStyles">
      GPT Chat News Generator
    </div>
  </NuxtLink>
</template>

<style scoped>
.logo {
  font-family: 'Chomsky', sans-serif;
}
</style>
