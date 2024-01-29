<script setup lang="ts">
import {
  UserCircleIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

import { mainMenu } from '@/assets/data/menu-links'

const router = useRouter()

const { logUserOut } = useAuthStore() // use authenticateUser action from  auth store
const { isAuthenticated } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

const menuLinks = ref(mainMenu)

const logout = () => {
  logUserOut()
  router.push('/auth/login')
}

const currentColor = ref('#FFF')

const mobileVisibility = ref(false)

function toggleMenu() {
  if (window.innerWidth < 1280) mobileVisibility.value = !mobileVisibility.value
}
</script>

<template>
  <header>
    <nav class="bg-black text-white dark:bg-gray-800 px-4 xl:px-6 mb-2 sm:mb-5">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <TheLogo />

          <div class="flex items-center xl:order-2 xl:min-w-[240px]">
            <div v-if="!isAuthenticated" class="flex items-center">
              <BaseButton to="/auth/login" class="flex items-center">
                <UserCircleIcon
                  class="h-5 sm:h-6 w-5 sm:w-6 sm:mr-2 shrink-0"
                />
                <span class="hidden sm:block">Log in</span>
              </BaseButton>
              <BaseButton
                to="/auth/registration"
                active
                class="flex items-center ml-1 sm:ml-3"
              >
                <ArrowRightOnRectangleIcon
                  class="h-5 sm:h-6 w-5 sm:w-6 sm:mr-2 shrink-0"
                />
                <span class="hidden sm:block">Get started</span>
              </BaseButton>
            </div>
            <div v-else class="z-20">
              <client-only>
                <TheHeaderDropdown />
              </client-only>
            </div>

            <!-- MOBILE BUTTON  -->
            <!-- 
            for btn
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 -->
            <button
              aria-label="Menu toggle"
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center text-sm text-gray-500 rounded-lg xl:hidden p-1 sm:p-2 ml-1"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              @click="toggleMenu"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                :fill="currentColor"
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
                :fill="currentColor"
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

          <!-- MAIN MENU  -->
          <div
            id="mobile-menu-2"
            class="fixed xl:relative top-0 xl:right-auto z-20 xl:z-0 h-screen xl:h-auto bg-black xl:flex mr-auto justify-between items-center w-full xl:w-auto xl:order-1 transition-all rounded-lg mx-auto"
            :class="[mobileVisibility ? ' right-0' : '-right-full']"
          >
            <button
              aria-label="Toggle menu"
              class="absolute top-2 right-2 xl:hidden"
              type="button"
              @click="toggleMenu"
            >
              <XCircleIcon class="h-7 w-7 text-white" />
            </button>
            <ul
              class="flex xl:flex-row xl:space-x-2 flex-col mt-4 font-medium xl:mt-0"
            >
              <li v-for="(link, idx) in menuLinks" :key="`item-${idx}`">
                <MyLink :to="link.to" :title="link.name" @click="toggleMenu" />
                <!-- <TheHeaderNavLink :link="link" /> -->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
