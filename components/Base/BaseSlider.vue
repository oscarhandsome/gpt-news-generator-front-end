<script lang="ts" setup>
import type { InputProps } from 'types'

defineEmits(['update:modelValue'])
const props = defineProps<InputProps>()
const id = props.label.toLocaleLowerCase().replaceAll(' ', '-')

const [min, max] = [50, 200]
</script>

<template>
  <div>
    <label
      for="steps-range"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Range steps: {{ modelValue }}</label
    >
    <input
      :id="id"
      :ref="id"
      type="range"
      min="50"
      max="200"
      :value="modelValue"
      step="5"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <div class="flex justify-between w-full text-xs text-slate-500">
      <span>{{ min }}</span> <span>{{ max }}</span>
    </div>
  </div>
</template>
