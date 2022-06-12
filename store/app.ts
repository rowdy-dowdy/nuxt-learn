import { defineStore } from "pinia";
import { getLocation } from "~/api/app";

export interface Coords {
  lat: number,
  lon: number
}

export interface AppState {
  coords: Coords | null
}

const state = (): AppState => ({
  coords: null
})

const getters = {
}

const actions = {
  async getLocation () {
    try {
      if (this.coords == null) {
        this.coords = await getLocation()
      }

      return this.coords
    } catch (error) {
      return null
    }
  },
}

export const useAppStore = defineStore('appStore', {
  state,
  getters,
  actions
})