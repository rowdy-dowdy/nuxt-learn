<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  text: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['update:text'])

const updateText = (event: Event) => {
  emit('update:text', (event.target as HTMLInputElement).value)
}

const focus = ref(false)
const input = ref<HTMLInputElement>(null)

const clickFocus = () => {
  if (input.value)
    input.value.focus()
}
</script>

<template>
  <div @click="clickFocus" class="relative w-full rounded-lg pl-4 py-2 flex border border-gray-200 bg-gray-50"
    :class="focus && '!border-blue-600 !bg-white'">
    <span class="absolute top-0 left-4 h-full px-0.5 flex items-center pointer-events-none">
      <span class="absolute w-full h-0.5 bg-gray-50 -top-0.5 left-0 scale-x-0 transition-all duration-300 origin-center"
        :class="(focus || text != '') && '!scale-x-100'"></span>

      <span class="relative font-semibold text-gray-600 transition-all duration-300"
        :class="[(focus || text != '') && '!-translate-y-5 text-sm', focus && '!text-blue-600']">
        <slot name="label"/>
      </span>
    </span>

    <input 
      ref="input"
      :type="type"
      class="flex-grow min-w-0 bg-transparent font-medium"
      :style="!focus && '--bg-input: rgb(249 250 251)'"
      @input="updateText"
      :value="text"
      @focus="focus = true"
      @blur="focus = false"
    />

    <span class="flex-none mx-2 pointer-events-none">
      <div class="icon"
        :class="focus && '!text-blue-600'">
        <slot name="icon"/>
      </div>
    </span>
  </div>
</template>