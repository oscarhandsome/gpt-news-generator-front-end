<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue'

const props = defineProps<{
  path: String
}>()

const router = useRouter()

const navigateTo = () => router.push(`${props.path}`)
</script>

<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-violet-500 text-white' : 'text-gray-900',
        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
      @click="navigateTo"
    >
      <slot name="icon"></slot>
      <slot />
    </button>
  </MenuItem>
</template>
