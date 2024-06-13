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
import { useHistoryStore } from '@/store/history'
import { formatDate, clearObject } from '@/utils/utils'

import { useCommonStore } from '@/store/common'

import type { INews } from '@/types'

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

const { getHistory } = useHistoryStore()
const { history, isLoadingHistory } = storeToRefs(useHistoryStore())

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
const historyVisibility = ref(false)

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

const getHistoryToggle = async (id: string) => {
  historyVisibility.value = true
  await getHistory({ id })
}

const restoreHistory = (item: INews) => {
  form.value = {
    ...item,
  }
}
const setImageAsImageCover = (idx: number) => {
  form.value.imageCover = currentNews.value.images[idx]
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
  title: 'Edit page for news',
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
              <!-- <button
                class="text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-500 transition-colors rounded-lg px-2"
                @click="getImages(currentNews.id, currentNews.workflowRunId)"
              >
                Get images & info
              </button> -->
              <BaseButton
                aria-label="Get New Images"
                btn-type="button"
                btn-styles="tertiary"
                class="px-2"
                @clicked="getImages(currentNews.id, currentNews.workflowRunId)"
              >
                Get images & info
              </BaseButton>

              <!-- <button
                v-if="getNewImagesBtnVisibility"
                class="border border-gray-500 hover:bg-gray-300 active:bg-gray-300 transition-colors rounded-lg px-2 mx-2"
                @click="createNewImages(currentNews.id)"
              >
                Generate new images
              </button> -->
              <BaseButton
                v-if="getNewImagesBtnVisibility"
                aria-label="Navigate to edit this news"
                btn-type="button"
                btn-styles="secondary"
                class="px-2 mx-2"
                @clicked="createNewImages(currentNews.id)"
              >
                Generate new images
              </BaseButton>
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
          @update:model-value="form.name = $event"
        />
        <BaseTextarea
          :model-value="form.description"
          label="Description"
          error=""
          class="mb-2"
          @update:model-value="form.description = $event"
        />

        <div
          v-if="currentNews.images && currentNews.images.length"
          class="flex flex-wrap gap-2"
        >
          <div
            v-for="(image, idx) in currentNews.images"
            :key="`image-${idx}`"
            class="img-additional-parent relative flex"
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

            <BaseButton
              title="Set as Image Cover"
              aria-label="Set as Image Cover additional image"
              class="img-set-image-cover flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
              type="button"
              btn-styles="secondary"
              @clicked="setImageAsImageCover(idx)"
            >
              <span>Set as main</span>
            </BaseButton>
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

  <div v-if="!isLoading">
    <div class="flex items-center mb-2">
      <div class="font-bold">History</div>
      <BaseButton
        class="ml-2 px-2"
        btn-styles="secondary"
        @clicked="getHistoryToggle(currentNews.id)"
        >Get history</BaseButton
      >
      <BaseSpinner v-if="isLoadingHistory" />
    </div>
    <div
      v-if="historyVisibility && history && history.length"
      class="border border-gray-300 rounded-lg lg:p-4 p-2"
    >
      <ul
        class="ps-1 sm:ps-2 md:ps-5 mt-1 md:mt-2 space-y-1 list-disc list-inside"
      >
        <template v-for="item in history" :key="item.id">
          <li>
            <span class="font-bold">Date:</span>
            {{ formatDate(item.createdAt) }}
          </li>
          <li><span class="font-bold">Name:</span> {{ item.name }}</li>
          <li>
            <span class="font-bold">Description:</span> {{ item.description }}
          </li>
          <li class="relative">
            <span class="font-bold">Statuses:</span>
            Active:
            <NewsStatusIcons :status="item.isActive" />

            Public:
            <NewsStatusIcons :status="item.isPublic" />

            <div
              v-if="item.images && item.images.length"
              class="flex flex-wrap gap-2"
            >
              <div
                v-for="(image, idx) in item.images"
                :key="`image-${idx}`"
                class="relative flex"
              >
                <nuxt-img
                  v-if="image"
                  :src="image"
                  :alt="`${currentNews.name}_image_${idx}`"
                  loading="lazy"
                  width="100"
                  height="100"
                  placeholder="/placeholder.png"
                  class="rounded-lg dark:bg-gray-700"
                />
              </div>
            </div>

            <BaseButton
              class="absolute bottom-2 right-2 px-2"
              btn-styles="secondary"
              @clicked="restoreHistory(item)"
            >
              Restore
            </BaseButton>
          </li>

          <div class="border-b-4 border-gray-200 pb-2 mb-1"></div>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.img-additional-parent {
  cursor: pointer;
  transition: all cubic-bezier(0.39, 0.575, 0.565, 1) ease-in;
}
.img-additional-parent:hover .img-set-image-cover,
.img-additional-parent:active .img-set-image-cover {
  opacity: 1;
}
.img-set-image-cover {
  opacity: 0;
}
</style>
