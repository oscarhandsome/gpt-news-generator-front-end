<script lang="ts" setup>
import { CircleStackIcon } from '@heroicons/vue/20/solid'

function agreeCookie() {
  visibility.value = false
  localStorage.setItem('cookie-agreement', 'agree')
}

const visibility = ref(false)

onMounted(() => {
  const agree = localStorage.getItem('cookie-agreement')
  if (!agree) visibility.value = true
})
</script>

<template>
  <div
    class="fixed bottom-4 sm:bottom-10 right-4 sm:right-10 left-4 sm:left-10 rounded-lg bg-white dark:bg-black dark:text-white shadow-lg p-5"
    :class="[
      visibility ? 'sm:flex sm:items-center sm:justify-between' : 'hidden',
    ]"
  >
    <CircleStackIcon
      class="flex-shrink-0 h-14 w-14 text-blue-700 sm:mr-5 mr-2"
      aria-hidden="true"
    />
    <p class="sm:mr-5 mb-5 sm:mb-0">
      Our website uses cookies. By using this website, you agree to their use in
      accordance with the browser settings. You can modify your browser settings
      on your own. For more information see our
      <BaseLink to="/policy">Privacy Policy.</BaseLink>
    </p>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="agreeCookie"
    >
      Agree
    </button>
  </div>
</template>
