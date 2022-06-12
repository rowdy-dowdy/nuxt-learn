<script setup lang="ts">
const props = defineProps({
  check: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:check'])

const updateText = () => {
  emit('update:check', !props.check)
}
</script>

<template>
  <div @click="updateText" class="flex items-center space-x-2 cursor-pointer select-none">
    <div class="w-5 h-5 border rounded overflow-hidden text-white bg-white focus-within:border-blue-600"
      :class="check && '!border-green-600 !text-green-600'">
      <a href="#" class="icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
      </a>
    </div>
    <span class="text-sm font-semibold text-gray-500">
      <slot name="label"/>
    </span>
  </div>
</template>