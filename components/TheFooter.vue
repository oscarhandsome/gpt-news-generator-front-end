<template>
  <footer
    class="bg-black text-white sm:rounded-lg shadow dark:bg-gray-800 mt-7 sm:m-5"
  >
    <div class="container mx-auto px-2 lg:px-0 py-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <TheLogo small />
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <nuxt-link to="/about-us" class="mr-4 hover:underline md:mr-6"
              >About us</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/policy" class="mr-4 hover:underline md:mr-6"
              >Privacy Policy</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/terms" class="mr-4 hover:underline md:mr-6"
              >Term's and Privacy</nuxt-link
            >
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <span
        class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023
        <a href="http://elbargo.ru/" class="hover:underline">Elbargo™</a>. All
        Rights Reserved.</span
      >
    </div>
  </footer>
</template>
