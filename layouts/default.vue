<script lang="ts" setup></script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
    <TheHeader />
    <main class="flex flex-col flex-grow">
      <div
        class="container flex flex-col flex-grow w-full mx-auto px-2 sm:px-0"
      >
        <TheBreadcrumb />
        <slot />
      </div>
    </main>
    <TheCookie />
    <TheFooter class="mt-auto mb-0" />

    <BaseUpButton />
    <!-- <BaseModal><TheFeedback /></BaseModal> -->
  </div>
</template>
