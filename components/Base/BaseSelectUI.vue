<script lang="ts" setup>
// import { ref } from 'vue'

import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import type { Option } from '@/types'

const props = defineProps<{
  items: Option[]
}>()

// const props = defineProps({
//   items: {
//     type: Object,
//     // default: false,
//   },
//   // selectedItem: {
//   //    type: Number,
//   //   default: 1,
//   // }
// })

console.log('props.items', props.items)

const emits = defineEmits(['update:modelValue'])

// import { storeToRefs } from 'pinia'
// import { useNewsStore } from '~/store/news'

// // const { createNews } = useNewsStore()
// const { famousPersons } = storeToRefs(useNewsStore())

// console.log('famousPersons', famousPersons.value)

// const people = famousPersons.value
// const people = [
//   { name: 'Wade Cooper' },
//   { name: 'Arlene Mccoy' },
//   { name: 'Devon Webb' },
//   { name: 'Tom Cook' },
//   { name: 'Tanya Fox' },
//   { name: 'Hellen Schmidt' },
// ]
const selectedItem = ref(props.items[0])
// const selectedPerson = ref('Plese select person')

watch(selectedItem, (_val) => {
  console.log('_val', _val)
  emits('update:modelValue', selectedItem.value.name)
})
</script>

<template>
  <div class="relative z-10">
    <Listbox v-model="selectedItem">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer rounded-lg bg-white dark:text-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedItem.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="item in items"
              v-slot="{ active, selected }"
              :key="item.name"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative select-none py-2 pl-10 pr-4 cursor-pointer transition-colors',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ item.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
