<script lang="ts" setup>
import type { IComment } from '@/types'
import { formatDate } from '@/utils/utils'

import { useCommentsStore } from '@/store/comments'
const { postComment, updateComment, deleteComment } = useCommentsStore()

// const props = defineProps<Comment>()
const props = defineProps<{ item: IComment }>()

const isEdit = ref(false)
const isReply = ref(false)
const comment = ref('')

const formattedCreatedAtWithoutTime = computed(() =>
  formatDate(props.item.createdAt, 2),
)
const formattedCreatedAt = computed(() => formatDate(props.item.createdAt, 3))
const formattedCreatedAtString = computed(() =>
  formatDate(props.item.createdAt, 5),
)

const edit = ({ id }: { id: string }) => {
  // toggleDropdown()
  comment.value = props.item.comment
  isEdit.value = true
  // this.$refs[`text-area-${id}`].click()
  console.log('edit id:', id)
}

const updateCurrentComment = async (value: { id: string; text: string }) => {
  isEdit.value = false
  await updateComment({ id: value.id, comment: value.text })
}

const toggleReply = () => {
  isReply.value = !isReply.value
}

// const replyComment = async (value: {
//   newsId: string
//   text: string
//   parentId: string
// }) => {
//   isReply.value = false
//   await postComment({
//     id: value.newsId,
//     comment: value.text,
//     parentId: value.parentId,
//   })
// }

const removeComment = async ({ id }: { id: string }) => {
  await deleteComment({ id })
}
</script>

<template>
  <article
    class="text-base bg-white rounded-lg dark:bg-gray-900"
    :class="[item.parentId ? 'p-6 mb-3 ml-6' : 'py-3']"
  >
    <footer class="relative flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <nuxt-img
            v-if="item.user && item.user.photo"
            :src="item.user.photo"
            :alt="item.user.name"
            loading="lazy"
            width="30"
            height="30"
            placeholder="/placeholder.png"
            :modifiers="{ roundCorner: '0:100' }"
            class="mr-2 w-6 h-6 rounded-full"
          />

          {{ item.user && item.user.name ? item.user.name : '' }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time
            pubdate
            :datetime="formattedCreatedAtString"
            :title="formattedCreatedAtWithoutTime"
          >
            <!-- Feb. 8, 2022 -->
            {{ formattedCreatedAt }}
          </time>
        </p>
      </div>

      <!-- Dropdown btn&menu -->
      <NewsCommentDropdown
        :item-id="item.id"
        :item-user-id="item.user.id"
        @edit="edit"
        @remove="removeComment"
      />
    </footer>
    <p v-if="!isEdit" class="text-gray-500 dark:text-gray-400">
      {{ item.comment }}
    </p>
    <NewsCommentTextarea
      v-else
      :id="item.id"
      v-click-outside="() => (isEdit = false)"
      :text="comment"
      @update="updateCurrentComment"
    />
    <!--<div class="flex items-center mt-4 space-x-4">
      <NewsCommentReplyButton @toggle-reply="toggleReply" />
    </div>
    <div v-if="isReply">
       <NewsCommentTextarea
        v-click-outside="() => (isReply = false)"
        :news-id="item.news"
        :parent-id="item.id"
        :is-reply="isReply"
        @update="replyComment"
      /> 
      <FormNewsComment
        v-click-outside="() => (isReply = false)"
        :current-news-id="item.news"
        :parent-id="item.id"
        :is-reply="isReply"
      />
    </div> -->
  </article>

  <!-- <NewsCommentList
    v-for="subItem in item.comments"
    :key="subItem.id"
    :comments="subItem.comments"
    :current-news-id="subItem.id"
    :ratings-average="1"
  /> -->
</template>
