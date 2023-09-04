<script setup lang="ts">
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created
import { DocumentIcon } from '@heroicons/vue/20/solid'

import { mainMenu } from '@/assets/data/menuLinks'

const router = useRouter()

const { logUserOut } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const menuLinks = ref(mainMenu)

const logout = () => {
  logUserOut()
  router.push('/auth/login')
}
</script>

<template>
  <header>
    <nav
      class="border-green-700 px-4 lg:px-6 py-2.5 dark:bg-gray-800 bg-black text-white mb-5"
    >
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <TheLogo />

        <div class="flex items-center lg:order-2">
          <div v-if="!isAuthenticated">
            <BaseButton to="/auth/login">Log in</BaseButton>
            <BaseButton to="/auth/registration" active class="ml-3"
              >Get started</BaseButton
            >
          </div>
          <div v-else>
            <client-only>
              <TheHeaderDropdown />
            </client-only>
          </div>

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu-2"
          class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        >
          <ul
            class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-2 lg:mt-0"
          >
            <li v-for="(link, idx) in menuLinks" :key="idx">
              <MyLink :to="link.to" :title="link.name" />
              <!-- <TheHeaderNavLink :link="link" /> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
