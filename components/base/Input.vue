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

const focus = ref(false)
</script>

<template>
  <div class="relative w-full rounded-md pl-4 py-2 flex border-2 border-gray-200 bg-gray-50"
    :class="focus && '!border-blue-600 !bg-white'">
    <span class="absolute top-0 left-4 h-full px-0.5 flex items-center">
      <span class="absolute w-full h-0.5 bg-white -top-0.5 left-0 scale-x-0 transition-all duration-300 origin-center"
        :class="(focus || text != '') && '!scale-x-100'"></span>

      <span class="relative font-semibold text-gray-600 transition-all duration-300"
        :class="[(focus || text != '') && '!-translate-y-5 text-sm', focus && '!text-blue-600']">
        <slot name="label"/>
      </span>
    </span>
    <input 
      :type="type"
      class="flex-grow min-w-0 bg-transparent font-medium"
      v-model="text"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span class="flex-none mx-2">
      <div class="icon"
        :class="focus && '!text-blue-600'">
        <slot name="icon"/>
      </div>
    </span>
  </div>
</template>