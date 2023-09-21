<script lang="ts" setup>
import type { CheckboxProps } from 'types'

defineEmits(['update:modelValue'])
const props = defineProps<CheckboxProps>()
const id = props.label.toLocaleLowerCase().replaceAll(' ', '-')
</script>

<template>
  <div class="flex">
    <input
      :id="id"
      :ref="id"
      type="checkbox"
      :checked="modelValue"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :class="{ 'ring-rose-500': error }"
      @input="$emit('update:modelValue', $event.target?.checked)"
    />
    <label
      :for="id"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }} <span v-if="required" class="text-rose-500">*</span></label
    >
    <slot name="after-label"></slot>
  </div>
</template>
