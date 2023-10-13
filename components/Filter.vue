<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '@/store/news'
import { useSettingsStore } from '@/store/settings'

const { famousPersons, newsList } = storeToRefs(useNewsStore())
const { settings } = storeToRefs(useSettingsStore())

console.log('settings', settings.value)

interface OptionSelectUi {
  name: string
}

// const people: OptionSelectUi[] = [
//   { name: 'Wade Cooper' },
//   { name: 'Arlene Mccoy' },
//   { name: 'Devon Webb' },
//   { name: 'Tom Cook' },
//   { name: 'Tanya Fox' },
//   { name: 'Hellen Schmidt' },
// ]

const limitPerPage = [{ name: '15' }, { name: '20' }, { name: '25' }]

const updateLimit = (paginationLimit: number) => {
  settings.value.paginationLimit = Number(paginationLimit)
  localStorage.setItem(
    'settings',
    JSON.stringify({
      ...settings.value,
      paginationLimit: Number(paginationLimit),
    }),
  )
}

const updatePersons = (value: string) => {
  console.log('updatePersons', value)
}
</script>

<template>
  <div class="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5">
    <div class="flex items-center">
      <span class="mr-2">Famous person:</span>
      <BaseSelectUI
        v-if="famousPersons && famousPersons.length"
        :items="famousPersons"
        class="w-52"
        @update="updatePersons"
      />
    </div>
    <div class="flex items-center">
      <span class="mr-2">Per page:</span>
      <BaseSelectUI :items="limitPerPage" class="w-20" @update="updateLimit" />
    </div>
  </div>
</template>
