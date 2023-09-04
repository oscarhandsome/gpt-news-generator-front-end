<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useNewsStore } from '~/store/news' // import the news store we just created

const { createNews } = useNewsStore() // use authenticateUser action from  auth store
const { isloading, errors } = storeToRefs(useNewsStore()) // make isAuthenticated state reactive with storeToRefs

// const router = useRouter()

const data = reactive({
  name: '',
  type: 'funny',
  famousPerson: '',
  place: '',
  length: 50,
  checkboxPublic: true,
  checkboxActive: true,
  ratingsAverage: 1.0,
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

const submitForm = () => createNews(data)
</script>

<template>
  <BaseLoader v-if="isloading" />
  <div
    v-else
    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 mx-auto"
  >
    <form class="grid lg:grid-cols-2 lg:gap-5" @submit.prevent="submitForm">
      <div>
        <BaseInput
          placeholder="Magnificent new news!"
          v-model="data.name"
          label="Name"
          type="string"
          :error="errors.name"
          required
          class="mb-6"
          @update:modelValue="data.name = $event"
        />

        <BaseSelect
          label="Choose news type"
          :options="newsTypesOptions"
          :modelValue="data.type"
          error=""
          class="mb-6"
          @update:modelValue="data.type = $event"
        />

        <BaseInput
          v-model="data.famousPerson"
          label="Famous person"
          type="string"
          error=""
          placeholder="Arnold Schwarzenegger"
          required
          class="mb-6"
          @update:modelValue="data.famousPerson = $event"
        />
      </div>

      <div>
        <BaseInput
          v-model="data.place"
          label="Place"
          type="string"
          error=""
          placeholder="Laguna Beach California"
          required
          class="mb-6"
          @update:modelValue="data.place = $event"
        />

        <BaseSlider
          v-model="data.newsLength"
          label="Length"
          error=""
          class="mb-5"
          @update:modelValue="data.newsLength = $event"
        />

        <div class="mb-6">
          <fieldset>
            <legend class="sr-only">Checkbox variants</legend>

            <BaseCheckbox
              :modelValue="data.checkboxPublic"
              label="Public view"
              error=""
              class="mb-4"
              @update:modelValue="data.checkboxPublic = $event"
            />

            <BaseCheckbox
              :modelValue="data.checkboxActive"
              label="Active"
              error=""
              class="mb-4"
              @update:modelValue="data.checkboxActive = $event"
            />
          </fieldset>
        </div>

        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create my News!
        </button>
      </div>
    </form>
  </div>
</template>
