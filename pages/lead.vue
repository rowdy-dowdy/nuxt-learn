<script setup lang="ts">
useHead({
  title: 'My App - %s',
  // meta: [{ name: 'title', content: `App Name - Lead` }]
})

const config = useRuntimeConfig();
const { data } = await useFetch(`${config.app_url}/api/boards`, {method: 'get'})

const list = (data.value as any).boards

const text = ref('')

const addList = async () => {
  try {
    const res = await $fetch(`${config.app_url}/api/boards/create`, {
      method: 'POST',
      body: {
        title: text.value
      }
    })

    console.log(res)

  } catch (error) {
    console.log(error)
  }
  // if (text.value != '')
  //   list.value.push({
  //     id: (list.value[list.value.length - 1].id + 1) || 1,
  //     title: text.value,
  //     items: []
  //   })

  text.value = ''
}

const item_add = ref(0)

const child_title = ref('')
const child_description = ref('')

let index = 999
const addMore = () => {
  let item = list.value.find(v => v.id == item_add.value)
  
  item?.items.push({
    id: ++index,
    title: child_title.value,
    description: child_description.value
  })

  child_title.value = ''
  child_description.value = ''

  item_add.value = 0
}

var index_drop = 0
var temp_drop = null



</script>

<template>
  <Container class="py-6">
    <form @submit.prevent="addList()" class="w-full">
      <input v-model="text" type="text" class="px-4 py-2 border bg-white">
      <button class="px-4 py-2 border border-l-0">Add</button>
    </form>

    <div class="flex space-x-4 overflow-x-auto mt-8">
      <div v-for="(value, index) in list" :key="index" 
        class="flex-none w-80 min-h-[500px] border bg-gray-200">
        <h1 class="w-full border-b px-4 py-2 text-center text-xl font-semibold bg-white">
          {{ value.title }}
        </h1>

        <div class="flex flex-col space-y-4 p-4">
          <div v-for="item in value.items" :key="item.id" class="w-full rounded p-4 shadow bg-white">
            <h3 class="text-lg te">{{ item.title }}</h3>
            <p class="mt-2 line-clamp-3 whitespace-pre-wrap">{{ item.description }}</p>
          </div>
        </div>

        <div class="px-4">
          <button @click.prevent.stop="item_add = value.id"
            class="w-full px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white">Add more</button>
          </div>
      </div>
    </div>

    <div v-show="item_add != 0"
      class="fixed w-full h-full top-0 left-0 pointer-events-none flex flex-col before:content-[''] before:flex-1 after:content-[''] after:flex-1">
      <div 
        v-click-outside="() => item_add = 0"
        class="flex-none w-full max-w-2xl mx-auto p-8 bg-white rounded shadow border pointer-events-auto">
        <h1 class="text-xl font-semibold text-center mb-4">Add more</h1>
        <input v-model="child_title" type="text" class="w-full px-4 py-2 border rounded" required placeholder="Title">
        <textarea v-model="child_description" name="description" required id="description" rows="3"
          class="w-full px-4 py-2 border rounded mt-4"></textarea>
        <button @click.prevent="addMore()"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded mt-4 float-right">Add</button>
      </div>
    </div>
  </Container>
</template>