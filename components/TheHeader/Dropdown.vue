<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  DocumentIcon,
  ChevronDownIcon,
  ArchiveBoxIcon as ArchiveIcon,
  DocumentDuplicateIcon as DuplicateIcon,
  EllipsisHorizontalIcon as MoveIcon,
  PencilSquareIcon as EditIcon,
  TrashIcon as DeleteIcon,
  ArrowRightOnRectangleIcon,
  ListBulletIcon as ViewListIcon,
  CreditCardIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from '@heroicons/vue/20/solid'

import { useAuthStore } from '~/store/auth'
// import { User } from '@/types'

import { dropdownMenu } from '@/assets/data/dropdown-links'

const router = useRouter()
const { user, logUserOut, isAuthenticated } = useAuthStore()

const menu = ref(dropdownMenu)

const logout = () => {
  logUserOut()
  router.push('/auth/login')
}
</script>

<template>
  <div v-if="user && isAuthenticated" class="relative sm:w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex break-all w-full justify-center rounded-md bg-gray-200 bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 p-1 sm:px-4 sm:py-2"
        >
          <UserCircleIcon
            class="shrink-0 h-5 w-5 text-violet-200 hover:text-violet-100 sm:hidden"
          />
          <span class="hidden sm:inline">{{ user.name || user.email }}</span>
          <ChevronDownIcon
            class="shrink-0 h-5 w-5 text-violet-200 hover:text-violet-100 -mr-1"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <TheHeaderDropdownItem
              v-for="(item, idx) in menu"
              :key="`dropdown-${idx}`"
              :path="item.to"
            >
              <template #icon>
                <component
                  :is="item.icon"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                ></component>
              </template>
              {{ item.name }}
            </TheHeaderDropdownItem>
          </div>

          <div class="px-1 py-1 cursor-pointer">
            <MenuItem v-slot="{ active }">
              <nuxt-link
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                @click="logout"
              >
                <ArrowRightOnRectangleIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                Logout
              </nuxt-link>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
