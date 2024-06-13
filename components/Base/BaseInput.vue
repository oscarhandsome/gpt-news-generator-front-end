<script lang="ts" setup>
// import type { InputHTMLAttributes } from 'vue'
import type { InputProps } from '@/types'

defineEmits(['update:modelValue'])
const props = defineProps<InputProps>()
const id = props.label
  ? props.label.toLocaleLowerCase().replaceAll(' ', '-')
  : Math.random()
const value = ref(props.modelValue)

watchEffect(() => (value.value = props.modelValue))
</script>

<template>
  <div class="relative">
    <div class="flex items-center">
      <label
        :for="id"
        class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }} <span v-if="required" class="text-rose-500">*</span></label
      >

      <BaseTooltip v-if="tooltip" :tooltip="tooltip" />
    </div>
    <slot name="after-label"></slot>
    <input
      :id="id"
      :ref="id"
      v-model="value"
      :name="id"
      :type="type ?? 'text'"
      class="border text-sm rounded-lg focus:outline-none block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors w-full p-2.5"
      :class="[
        error && !modelValue
          ? 'ring-rose-500  bg-red-100 border-red-300'
          : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
      ]"
      :placeholder="placeholder"
      @keyup="$emit('update:modelValue', value)"
    />
    <slot name="after-input"></slot>
    <p
      v-if="error && !modelValue"
      class="sm:absolute sm:top-full sm:left-0 text-xs text-red-600 transition-colors"
      v-text="Array.isArray(error) ? error[0] : error"
    ></p>
  </div>
</template>
