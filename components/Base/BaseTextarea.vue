<script lang="ts" setup>
defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
})

const text = ref(props.message)
</script>

<template>
  <div>
    <label
      :for="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <textarea
      :id="label"
      v-model="text"
      rows="10"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Leave a comment..."
      @keyup="$emit('update:modelValue', text)"
    >
    </textarea>
  </div>
</template>
