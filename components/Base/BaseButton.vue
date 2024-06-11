<script lang="ts" setup>
import type { PropType, ButtonHTMLAttributes, AriaAttributes } from 'vue'

// enum BtnStyles {
//   Primary = 'primary',
//   Secondary = 'secondary',
// }

const props = defineProps({
  btnType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  disabled: {
    type: Boolean as PropType<ButtonHTMLAttributes['disabled']>,
    default: false,
  },
  ariaLabel: {
    type: String as PropType<AriaAttributes['aria-label']>,
    default: 'aria-label-title',
  },
  btnStyles: {
    // type: String as PropType<BtnStyles>,
    type: String,
    default: 'primary',
  },
})
defineEmits<{
  (_e: 'clicked'): void
}>()

const classNames = computed(() => {
  if (props.btnStyles === 'primary')
    return 'text-white bg-black hover:bg-gray-600 active:bg-gray-500 dark:text-black dark:bg-white'
  if (props.btnStyles === 'secondary')
    return 'bg-gray-100 border border-gray-300 dark:border-gray-700 hover:bg-black dark:bg-gray-700 hover:text-white active:bg-black active:text-white'
  if (props.btnStyles === 'tertiary')
    return 'text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-500'
})
</script>

<template>
  <button
    :aria-label="ariaLabel"
    :type="btnType"
    class="inline-flex items-center rounded-lg outline-none transition-colors"
    :class="[
      classNames,
      disabled
        ? 'hover:opacity-60'
        : 'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed',
    ]"
    :disabled="disabled"
    @click="$emit('clicked')"
  >
    <slot />
  </button>
</template>
