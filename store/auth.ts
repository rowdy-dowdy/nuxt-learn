import { defineStore } from "pinia";
import { login } from "~/api/auth";

const state = () => ({
  user: {},
  token: localStorage.getItem('token') || null
})

const getters = {
}

const actions = {
  refresh_token (token: string) {
    this.token = token
  },

  async login ({user, token}) {
    this.user = user
  },

  logout () {
    this.user = {}
    this.token = ''

    this.$router.push('/login')
  }
}

export const useAuthStore = defineStore('authStore', {
  state,
  getters,
  actions
})