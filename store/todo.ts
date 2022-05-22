import { defineStore } from "pinia";

export interface Todo {
  id: number,
  title: string,
  done: boolean,
  created_at: Date,
  updated_at: Date
}

export interface TodoState {
  items: Todo[] | undefined[]
}

const state = (): TodoState => ({
  items: []
})

const getters = {
  getById: (state: TodoState) => (id: number) => {
    return state.items.find((v: Todo) => (v as Todo).id === id  )
  },
  getOrderedTodos: (state: TodoState) =>
    state.items.sort(
      (a: Todo, b: Todo) => 
        a.created_at.getMilliseconds() - b.created_at.getMilliseconds()
      
    )
}

const actions = {
  addTodo(title_todo: string) {
    let last_id: number = this.items[this.items.length - 1]?.id || 0

    const todo: Todo = {
      id: ++last_id,
      title: title_todo,
      done: false,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.items.push(todo)
  },

  updateTodo(id: number, done: boolean) {
    // this.items = this.items.map((item: Todo) => 
    //   item.id === id ? { ...item, done, updated_at: new Date()} : item
    // )
    this.items.find((item: Todo) => item.id === id).done = done
  },

  deleteTodo(id: number) {
    this.items = this.items.filter((item: Todo) => item.id !== id)
  }
}

export const useTodoStore = defineStore('todoStore', {
  state,
  getters,
  actions
})