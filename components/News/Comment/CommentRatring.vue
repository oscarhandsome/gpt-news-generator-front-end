<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'

const { postComment } = useNewsStore()

const prop = defineProps<{ currentNewsId: string; ratingsAverage: Number }>()

const rate = ref(0)
const data = reactive({
  id: prop.currentNewsId,
  rating: 0,
})

const changeRating = (value: number) => {
  // rate.value = value
  data.rating = value
  postComment(data)
}

onMounted(() => {
  rate.value = prop.ratingsAverage
})
</script>

<template>
  <div class="flex">
    <StarIcon
      v-for="star in 5"
      class="flex-shrink-0 h-5 sm:h-7 lg:h-10 w-h-5 sm:w-7 lg:w-10 hover:text-yellow-600 active:text-yellow-600 cursor-pointer"
      :class="[rate >= star ? 'text-yellow-600' : 'text-black dark:text-white']"
      aria-hidden="true"
      @click="changeRating(star)"
    />
  </div>
</template>
