<script lang="ts" setup>
const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const limitPerPage = [{ name: '15' }, { name: '20' }, { name: '25' }]
</script>

<template>
  <div class="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5">
    <div class="flex items-center">
      <span class="mr-2">Famous person:</span>
      <BaseSelectUI :items="people" class="w-52" />
    </div>
    <div class="flex items-center">
      <span class="mr-2">Per page:</span>
      <BaseSelectUI :items="limitPerPage" class="w-20" />
    </div>
  </div>
</template>
