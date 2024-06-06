<script lang="ts" setup>
import {
  // ArrowLeftCircleIcon,
  // ArrowRightCircleIcon,
  StarIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/20/solid'

// import { useGtm } from '@gtm-support/vue-gtm'

// import { mapState } from 'pinia'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/news'
import { useAuthStore } from '~/store/auth'
import { formatDate, clearObject } from '@/utils/utils'

import { useCommonStore } from '@/store/common'

defineProps({
  view: {
    type: String,
    default: 'tile',
  },
})

const route = useRoute()
const router = useRouter()
// const store = useNewsStore()
const { isAuthenticated, user } = storeToRefs(useAuthStore())

const { getNews, getNewsImagesResuls, updateFullNews, generateNewImages } =
  useNewsStore()
const { isLoading, currentNews, isLoadingLocal } = storeToRefs(useNewsStore())

if (!currentNews.value || !currentNews.value.slug)
  await getNews(`${route.params.slug}`)

const form = ref({
  ...currentNews.value,
  name: currentNews.value.name,
  desription: currentNews.value.description,
  imageCover: currentNews.value.imageCover,
  images: currentNews.value.images,
})
const getNewImagesBtnVisibility = ref(true)

const formattedCreatedAt = computed(() =>
  formatDate(currentNews.value.createdAt),
)

const removeImage = (id: number) => form.value.images.splice(id, 1)

const removeMainImage = () => (form.value.imageCover = null)

const createNewImages = async (id: string) => {
  getNewImagesBtnVisibility.value = false
  await generateNewImages({
    id,
    prompt: `Generate new images base on this description: ${form.value.description}`,
  })
}

const getImages = async (id: string, workflowRunId: string) => {
  await getNewsImagesResuls({
    id,
    workflowRunId,
  })
  router.push(`/news/${currentNews.value.slug}`)
}

const onSubmit = async () => {
  await updateFullNews({
    id: currentNews.value.id,
    ...form.value,
  })
  router.push(`/news/${currentNews.value.slug}`)
}

onMounted(() => {
  form.value = {
    ...currentNews.value,
    name: currentNews.value.name,
    desription: currentNews.value.description,
    imageCover: currentNews.value.imageCover,
    images: currentNews.value.images,
  }
})

useHead({
  meta: [{ name: 'Edit page for news', content: 'Edit page for news' }],
})
</script>

<template>
  <BaseLoader v-if="isLoading" default />
  <form v-else class="mb-12" @submit.prevent="onSubmit">
    <!-- Details of news {{ $route.params.slug }} -->

    <div class="lg:flex">
      <div
        class="relative flex flex-shrink-0 flex-col max-w-lg mx-auto mb-5 lg:mb-0"
      >
        <div
          class="absolute top-0 font-bold text-xs text-gray-500 text-right lg:text-left bg-white bg-opacity-60 rounded-bl-lg py-2 px-3"
          :class="[form.imageCover ? 'right-7 rounded-br-lg' : 'right-0']"
        >
          <!-- 10/06/2023 -->
          {{ formattedCreatedAt }}
        </div>
        <div
          class="flex items-center absolute top-0 left-0 font-bold text-xs text-gray-500 text-right lg:text-left rounded-br-lg py-1 px-2"
        >
          <StarIcon
            v-for="(star, idx) in Math.ceil(currentNews.ratingsAverage)"
            :key="`star-${idx}`"
            class="inline w-7 h-7 text-amber-500"
            aria-hidden="true"
          />
        </div>

        <div class="w-full mb-2">
          <nuxt-img
            v-if="form.imageCover"
            :src="form.imageCover"
            :alt="form.name"
            loading="lazy"
            width="512"
            height="512"
            placeholder="/placeholder.png"
            class="rounded-lg mx-auto dark:bg-gray-700"
          />
          <img
            v-else
            src="/images/no-image.jpeg"
            alt="no-image"
            class="rounded-lg mx-auto dark:bg-gray-700"
          />
        </div>

        <button
          v-if="form.imageCover"
          aria-label="Remove main image"
          class="absolute top-2 right-1"
          type="button"
          @click="removeMainImage()"
        >
          <XCircleIcon
            class="h-5 w-5 text-red-400 hover:text-red-500 active:text-red-600"
            aria-hidden="true"
          />
        </button>
      </div>

      <div class="w-full pb-2 lg:ml-4 xl:ml-6">
        <div v-if="isAuthenticated && currentNews.autor.id === user.id">
          <div class="flex items-center gap-2 bg-slate-100 rounded-lg p-2 mb-2">
            <BaseSwitch
              v-model="form.isActive"
              @update:model-value="form.isActive"
            >
              <template #label>Active:</template>
            </BaseSwitch>
            <BaseSwitch
              v-model="form.isPublic"
              @update:model-value="form.isPublic"
            >
              <template #label>Public:</template>
            </BaseSwitch>

            <BaseSpinner v-if="isLoadingLocal" />
            <div v-else class="flex items-center">
              <button
                class="text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-500 transition-colors rounded-lg px-2"
                @click="getImages(currentNews.id, currentNews.workflowRunId)"
              >
                Get images & info
              </button>

              <button
                v-if="getNewImagesBtnVisibility"
                class="border border-gray-500 hover:bg-gray-300 active:bg-gray-300 transition-colors rounded-lg px-2 mx-2"
                @click="createNewImages(currentNews.id)"
              >
                Generate new images
              </button>
              <VTooltip v-else>
                <ExclamationTriangleIcon
                  class="h-5 w-5 text-red-400 mx-2"
                  aria-hidden="true"
                />

                <template #popper>
                  Generating images can take from half to couple minutes
                </template>
              </VTooltip>
            </div>
          </div>
        </div>

        <BaseInput
          :model-value="form.name"
          label="News name"
          error=""
          class="mb-2"
          @update:model-value="form.name"
        />
        <BaseTextarea
          :message="form.description"
          label="Description"
          error=""
          class="mb-2"
          @update:model-value="form.description"
        />

        <div
          v-if="currentNews.images && currentNews.images.length"
          class="flex flex-wrap gap-2"
        >
          <div
            v-for="(image, idx) in currentNews.images"
            :key="`image-${idx}`"
            class="relative flex"
          >
            <nuxt-img
              v-if="image"
              :src="image"
              :alt="`${currentNews.name}_image_${idx}`"
              loading="lazy"
              width="150"
              height="150"
              placeholder="/placeholder.png"
              class="rounded-lg dark:bg-gray-700"
            />
            <button
              title="Remove additional image"
              aria-label="Remove additional image"
              class="absolute top-1 right-1"
              type="button"
              @click="removeImage(idx)"
            >
              <XCircleIcon
                class="h-5 w-5 text-red-400 hover:text-red-500 active:text-red-600"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end w-full">
      <button
        aria-label="Submit"
        type="submit"
        alue="Submit"
        class="text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors p-4"
      >
        Save
      </button>
    </div>
  </form>
</template>
