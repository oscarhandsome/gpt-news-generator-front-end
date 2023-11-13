<script lang="ts" setup>
import type { InputSliderProps } from 'types'

defineEmits(['update:modelValue'])
const props = defineProps<InputSliderProps>()
const id = props.label.toLocaleLowerCase().replaceAll(' ', '-')
</script>

<template>
  <div>
    <div class="flex items-center mb-2">
      <label
        for="steps-range"
        class="block text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }}: {{ modelValue }}</label
      >
      <BaseTooltip v-if="tooltip" :tooltip="tooltip" />
    </div>
    <input
      :id="id"
      :ref="id"
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      :step="step"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <div class="flex justify-between w-full text-xs text-slate-500">
      <span>{{ min }}</span> <span>{{ max }}</span>
    </div>
    <p
      v-if="error"
      class="mt-2 text-sm text-red-600"
      v-text="Array.isArray(error) ? error[0] : error"
    ></p>
  </div>
</template>
nuxt
