<script lang="ts" setup>
useSchemaOrg([
  defineWebSite({
    name: 'ChatGPT News Generator',
  }),
  defineWebPage(),
])

// const { $sentryCaptureException } = useNuxtApp()

// onMounted(() => {
//   $sentryCaptureException('Test exception')
// })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body::-webkit-scrollbar {
  width: 0.5em;
}

body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
