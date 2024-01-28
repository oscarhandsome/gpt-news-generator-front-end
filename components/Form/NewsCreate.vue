<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '~/store/news' // import the news store we just created

import { imagesModelIdOptions } from '@/assets/data/imagesModelIdOptions'

import { clearObject } from '@/utils/utils'

import type { NewsPayloadInterface } from '@/types'

import { newsCategories } from '@/assets/data/categories'

const { createNews } = useNewsStore() // use authenticateUser action from  auth store
const { isLoading, errors, error, success } = storeToRefs(useNewsStore()) // make isAuthenticated state reactive with storeToRefs

// const router = useRouter()

const data = reactive<NewsPayloadInterface>({
  name: '',
  type: 'funny',
  category: '',
  famousPerson: '',
  place: '',
  newsLength: 50,
  checkboxPublic: true,
  checkboxActive: true,
  ratingsAverage: 1.0,
  imageModelId: '37d42ae9-5f5f-4399-b60b-014d35e762a5', // Realistic Vision v4.0
  promptStrength: 7,
  steps: 50,
  imageCount: 1,
})

const newsTypesOptions = ref([
  {
    id: 1,
    name: 'Funny',
    value: 'funny',
  },
  {
    id: 2,
    name: 'Sadly',
    value: 'sadly',
  },
  {
    id: 3,
    name: 'Dangeroursly',
    value: 'dangerously',
  },
  {
    id: 4,
    name: 'Sensational',
    value: 'sensational',
  },
  {
    id: 5,
    name: 'Fantastic',
    value: 'fantastic',
  },
])

const imagesModelOptions = ref(imagesModelIdOptions)

const categoriesOptions = ref(newsCategories)

const submitForm = async () => await createNews(data)
// await createNews({
//   ...data,
//   imageModelId: imagesModelOptions.value[parseInt(data.imageModelId)].value,
//   type: newsTypesOptions.value[parseInt(data.type)].value,
// })

// if (Object.keys(currentNews).length) router.push(`/news/${currentNews.slug}`)

onBeforeUnmount(() => {
  errors.value = clearObject(errors.value)
})

// SEO

useSeoMeta({
  title: () => 'Create news page | GPT Chat News Generator',
})
</script>

<template>
  <BaseError :text="error" class="z-10 mx-auto w-full sm:w-auto max-w-xl" />
  <div
    class="relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 sm:shadow-2xl p-6 mb-10 mx-auto w-full"
  >
    <!-- LOADER -->
    <BaseLoader :show="isLoading" absolute />
    <form class="grid lg:grid-cols-2 lg:gap-5" @submit.prevent="submitForm">
      <div class="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
        <BaseTitleSecondary title="News configuration" class="mb-3" />
        <BaseInput
          v-model="data.name"
          placeholder="Magnificent new news!"
          label="Name"
          :error="errors.name"
          required
          class="mb-3"
          @update:model-value="data.name = $event"
        />

        <BaseSelect
          v-model="data.type"
          label="Choose news type"
          :options="newsTypesOptions"
          :error="errors.type"
          class="mb-3"
          @update:model-value="data.type = $event"
        />

        <BaseSelect
          v-model="data.category"
          label="Category"
          :options="categoriesOptions"
          :error="errors.category"
          class="mb-3"
          @update:model-value="data.category = $event"
        />

        <BaseInput
          v-model="data.famousPerson"
          label="Famous person"
          :error="errors.famousPerson"
          placeholder="Arnold Schwarzenegger"
          required
          class="mb-3"
          @update:model-value="data.famousPerson = $event"
        />

        <BaseInput
          v-model="data.place"
          label="Place"
          :error="errors.place"
          placeholder="Laguna Beach California"
          required
          class="mb-3"
          @update:model-value="data.place = $event"
        />

        <BaseSlider
          v-model="data.newsLength"
          label="Length"
          :min="50"
          :max="200"
          :step="5"
          :error="errors.newsLength"
          class="mb-3"
          @update:model-value="data.newsLength = $event"
        />

        <div class="mb-3">
          <fieldset>
            <legend class="sr-only">Checkbox variants</legend>

            <BaseCheckbox
              :model-value="data.checkboxPublic"
              label="Public view"
              error=""
              class="mb-4"
              @update:model-value="data.checkboxPublic = $event"
            />

            <BaseCheckbox
              :model-value="data.checkboxActive"
              label="Active"
              error=""
              class="mb-4"
              @update:model-value="data.checkboxActive = $event"
            />
          </fieldset>
        </div>

        <div class="mt-5"><span class="text-red-500">*</span> - required</div>
      </div>

      <div class="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
        <BaseTitleSecondary title="Image configuration" class="mb-3" />
        <BaseSelect
          v-model="data.imageModelId"
          :options="imagesModelOptions"
          label="Image Model Id"
          error=""
          class="mb-3"
          @update:model-value="data.imageModelId = $event"
        />

        <BaseSlider
          v-model="data.promptStrength"
          tooltip="The higher the prompt strength, the closer the generated image will be to the prompt. Must be between 0 and 30."
          label="Prompt Strength"
          :min="0"
          :max="30"
          :step="1"
          error=""
          class="mb-3"
          @update:model-value="data.promptStrength = Number($event)"
        />

        <BaseSlider
          v-model="data.steps"
          tooltip="How many steps the AI will take to generate the image. Lower is faster but less detailed, higher is slower more detailed."
          label="Steps"
          :min="50"
          :max="70"
          :step="5"
          error=""
          @update:model-value="data.steps = Number($event)"
        />

        <BaseSlider
          v-model="data.imageCount"
          label="Image count"
          :min="1"
          :max="4"
          :step="1"
          error=""
          @update:model-value="data.imageCount = Number($event)"
        />

        <button
          aria-label="News Create"
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        >
          Create my News!
        </button>
      </div>
    </form>
  </div>
</template>
