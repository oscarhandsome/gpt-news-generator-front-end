<script lang="ts" setup>
import type { InputProps } from '@/types'
defineEmits(['update:modelValue'])
const props = defineProps<InputProps>()

const text = ref(props.modelValue)

watchEffect(() => (text.value = props.modelValue))
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
      :class="[
        error && !modelValue
          ? 'ring-rose-500  bg-red-100 border-red-300'
          : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
      ]"
      placeholder="Leave a comment..."
      @keyup="$emit('update:modelValue', text)"
    >
    </textarea>

    <slot name="after-text"></slot>
    <p
      v-if="error && !modelValue"
      class="sm:absolute sm:top-full sm:left-0 text-xs text-red-600 transition-colors"
      v-text="Array.isArray(error) ? error[0] : error"
    ></p>
  </div>
</template>
