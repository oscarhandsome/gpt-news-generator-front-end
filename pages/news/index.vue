<script lang="ts" setup>
import { ListBulletIcon, RectangleGroupIcon } from '@heroicons/vue/20/solid'

const view = ref('tile')

const changeView = (value: string) => {
  view.value = value
}
</script>

<template>
  <div class="flex justify-between items-center">
    <FormFilter />

    <div class="flex justify-end m-5">
      <button
        class="border border-black hover:bg-black hover:text-white rounded p-2 mr-2"
        @click="changeView('list')"
      >
        <ListBulletIcon class="h-5 w-5" />
      </button>
      <button
        class="border border-black rounded p-2 hover:bg-black hover:text-white"
        @click="changeView('tile')"
      >
        <RectangleGroupIcon class="h-5 w-5" />
      </button>
    </div>
  </div>

  <div class="flex flex-col justify-center items-center mx-auto">
    <NewsList :view="view" />
  </div>
</template>
