<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Todo, useTodoStore } from '~~/store/todo';

const store = useTodoStore()
const { items } = storeToRefs(store)

const title_todo = ref('')

const addTodo = () => {
  if (title_todo.value == '')
    return 

  store.addTodo(title_todo.value)
  title_todo.value = ''
}

const updateTodo = (id:number, e: Event) => {
  let checked = (e.target as HTMLInputElement).checked

  store.updateTodo(id, checked)
}

const state_todo = ref('all')
const list_filter = computed(() => items.value.filter((item: Todo) => 
  state_todo.value == 'all' ? true : state_todo.value == 'complete' ?
    item.done == true : item.done == false
))

</script>

<template>
  <Container class="py-6">
    <div class="w-full max-w-lg min-h-[500px] mx-auto bg-red-400 rounded py-12 text-white">
      <h1 class="text-3xl text-center tracking-wider mx-16">Todo List</h1>

      <form class="flex space-x-1 my-4 mx-16"
        @submit.prevent="addTodo()">
        <input type="text" class="flex-grow px-2 py-2 bg-white border-none text-[#444]" 
          placeholder="Enter text..."
          v-model="title_todo">
        <button type="submit" class="px-4 py-2 border border-white hover:bg-white hover:text-red-400">Add</button>
      </form>

      <div class="flex justify-end space-x-2 mx-16">
        <label for="all" class="border p-2 py-1 select-none cursor-pointer">
          <input type="radio" checked name="done" v-model="state_todo" id="all" value="all" class="cursor-pointer">
          <span class="ml-2 cursor-pointer">All</span>
        </label>
        <label for="complete" class="border p-2 py-1 select-none cursor-pointer">
          <input type="radio" name="done" v-model="state_todo" id="complete" value="complete" class="cursor-pointer">
          <span class="ml-2 cursor-pointer">Complete</span>
        </label>
        <label for="unfinished" class="border p-2 py-1 select-none cursor-pointer">
          <input type="radio" name="done" v-model="state_todo" id="unfinished" value="unfinished" class="cursor-pointer">
          <span class="ml-2 cursor-pointer">Unfinished</span>
        </label>
      </div>

      <div class="mt-4 flex flex-col space-y-2">
        <div v-for="todo in list_filter" :key="todo.id"
          class="bg-red-300 px-16 py-4 select-none">
          <input @change="updateTodo(todo.id, $event)" type="checkbox" 
            :checked="todo.done" :id="'todo' + todo.id" class="peer cursor-pointer">
          <label :for="'todo' + todo.id" class="ml-2 peer-checked:line-through cursor-pointer">{{ todo.title }}</label>
        </div>
      </div>
    </div>
  </Container>
</template>