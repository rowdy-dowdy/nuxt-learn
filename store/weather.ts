import { defineStore } from "pinia";
import { getWeather } from "~/api/weather";

import { Coords, useAppStore } from '~~/store/app';

export interface Weather {
  name: String,
  weather: {
    main: String,
    feels_like: number
  }
}

export interface WeatherState {
  weather: Weather | null
}

const state = (): WeatherState => ({
  weather: null
})

const getters = {
}

const actions = {
  async getWeather () {
    try {
      const appStore = useAppStore()
      const coords: Coords =  await appStore.getLocation()

      if (!coords) {
        throw 'Not find location'
      }

      const config = useRuntimeConfig();

      const data_weather = await getWeather({
        lat: coords.lat,
        lon: coords.lon,
        key: config.KEY_OPEN_WEATHER_MAP
      })

      this.weather = {
        name: data_weather.name,
        weather: {
          main: data_weather.weather[0].main,
          feels_like: +(data_weather.main.feels_like - 273.15).toFixed(2)
        }
      }

      return this.weather

    } catch (error) {
      return null
    }
  },
}

export const useWeatherStore = defineStore('weatherStore', {
  state,
  getters,
  actions
})