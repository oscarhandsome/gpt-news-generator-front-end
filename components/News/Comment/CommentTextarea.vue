<script lang="ts" setup>
defineEmits(['update'])
const props = defineProps({
  newsId: {
    type: String,
    default: 'id0',
  },
  parentId: {
    type: String,
    default: 'id0',
  },
  text: {
    type: String,
    default: '',
  },
})

const comment = ref(props.text)
</script>

<template>
  <textarea
    :id="newsId"
    :ref="`textarea-id-${newsId}`"
    v-model="comment"
    name="comment"
    rows="5"
    class="border rounded-lg w-full px-2 py-1"
    @keyup.enter="$emit('update', { newsId, text: comment, parentId })"
  >
  </textarea>
</template>
