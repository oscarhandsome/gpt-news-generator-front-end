<script lang="ts" setup>
import type { InputSliderProps } from '@/types'

defineEmits(['update:modelValue'])
const props = defineProps<InputSliderProps>()
const id = props.label.toLocaleLowerCase().replaceAll(' ', '-')
const value = ref(props.modelValue)
</script>

<template>
  <div>
    <div class="flex items-center mb-2">
      <label
        :for="id"
        class="block text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }}: {{ value }}</label
      >
      <BaseTooltip v-if="tooltip" :tooltip="tooltip" />
    </div>
    <input
      :id="id"
      :ref="id"
      v-model="value"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      @input="$emit('update:modelValue', Number(value))"
    />
    <div class="flex justify-between w-full text-xs text-slate-500">
      <span>{{ min }}</span> <span>{{ max }}</span>
    </div>
    <p
      v-if="error && !value"
      class="mt-2 text-sm text-red-600"
      v-text="Array.isArray(error) ? error[0] : error"
    ></p>
  </div>
</template>
nuxt
