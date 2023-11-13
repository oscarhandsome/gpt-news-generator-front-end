<script lang="ts" setup>
import type { SelectProps } from 'types'

defineEmits(['update:modelValue'])
const props = defineProps<SelectProps>()
const id = props.label.toLocaleLowerCase().replaceAll(' ', '-')
</script>

<template>
  <div>
    <div class="flex items-center mb-2">
      <label
        :for="id"
        class="block text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }} <span v-if="required" class="text-rose-500">*</span>
      </label>
      <BaseTooltip v-if="tooltip" :tooltip="tooltip" />
    </div>
    <slot name="after-label"></slot>
    <select
      :id="id"
      :ref="id"
      :value="modelValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="{ 'ring-rose-500': error }"
      @input="$emit('update:modelValue', $event.target?.value)"
    >
      <option v-for="option in options" :value="option.value">
        {{ option.name }}
      </option>
    </select>
    <p
      v-if="error"
      class="mt-2 text-sm text-red-600"
      v-text="Array.isArray(error) ? error[0] : error"
    ></p>
  </div>
</template>
nuxt
