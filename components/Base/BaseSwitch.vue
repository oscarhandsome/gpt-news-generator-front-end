<script lang="ts" setup>
import { Switch, provideUseId } from '@headlessui/vue'
const enabled = defineModel<boolean>({ default: false })
// const props = defineProps({
//   modelValue: {
//     type: Boolean,
//     default: false,
//   },
// })
// const emit = defineEmits(['update:modelValue'])

// const enabled = ref(props.modelValue)

// watch(enabled, (newValue) => {
//   emit('update:modelValue', newValue)
// })

// Avoid hydration error
provideUseId(() => useId())
</script>

<template>
  <div class="flex items-center gap-2">
    <slot name="label"></slot>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-amber-500 ' : 'bg-black'"
      class="relative inline-flex h-6 w-11 items-center rounded-full"
    >
      <span class="sr-only">Enable notifications</span>
      <span
        :class="enabled ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
      />
    </Switch>
  </div>
</template>
