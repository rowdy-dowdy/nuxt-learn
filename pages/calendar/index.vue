<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Weather, useWeatherStore } from '~~/store/weather';

const store = useWeatherStore()
// const { items } = storeToRefs(store)

var weather = ref<Weather>(null)
const time_format = ref('')
var redirect_time = null

onMounted(() => {
  // store.getWeather()
  // .then(res => {
  //   weather.value = res
  // })

  redirect_time = setInterval(() => {
    let date_now = new Date(),
        hours = date_now.getHours(),
        minutes = date_now.getMinutes(),
        ampm = hours >= 12 ? 'PM' : 'AM';

    time_format.value = `${hours % 12 < 10 ? '0' + hours % 12 : hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
  }, 1000);
})

onUnmounted(() => {
  clearTimeout(redirect_time)
})

const calendar_tab = ref('month')

// change month
var months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let date_now = new Date()
const date_active = ref({
  day: date_now.getDate(),
  month: date_now.getMonth(),
  year: date_now.getFullYear()
})

const first_day = ref(new Date(date_active.value.year, date_active.value.month, 1))
const last_day = ref(new Date(date_active.value.year, date_active.value.month + 1, 0))

// data calendar
const config = useRuntimeConfig();
const [{ data: data_staffs }, { data: data_attendances, pending, refresh, error }] = await Promise.all([
  useFetch(`${config.APP_URL}/api/data/staffs`),
  useFetch(() => `/api/data/attendances?first_day=${first_day.value.toLocaleDateString("en-US")}&last_day=${last_day.value.toLocaleDateString("en-US")}`, { baseURL: config.APP_URL })
])

const list_day = ref([])
const transiton_calendar = ref('left-to-right')

const filterDay = (day: number, arr: Array<any>) => {
  let data_in_day = arr.filter(v => new Date(v.record_time).getDate() == day )

  // data_in_day.forEach(v => {
  //   arr.splice(arr.findIndex(i => i.id == v.id), 1)
  // })

  let data_group = data_in_day.reduce((pre,cur) => {
    if (!pre[cur.staff_uid]) {
      pre[cur.staff_uid] = [];
    }

    // Grouping
    pre[cur.staff_uid].push(cur);

    return pre
  },{})

  let data_format = []

  for (var key of Object.keys(data_group)) {
    let staff_temp = (data_staffs.value as any).staffs.find(v => v.uid == key)

    if(staff_temp) {
      let first_time = data_group[key].reduce((p, c) => { return new Date(p?.record_time).getTime() <= new Date(c?.record_time).getTime() ? p : c })?.record_time,
          last_time = data_group[key].reduce((p, c) => { return new Date(p?.record_time).getTime() >= new Date(c?.record_time).getTime() ? p : c })?.record_time
      
      let betwwen_time = Math.abs(new Date(first_time).getTime() -new Date(last_time).getTime())

      data_format.push({
        name: staff_temp.name,
        first_time,
        last_time,
        hours: `${Math.ceil(new Date(first_time).getTime()/1000/60/60)}:${Math.ceil(new Date(first_time).getTime()/1000/60%60)} 
          - ${Math.ceil(new Date(last_time).getTime()/1000/60/60)}:${Math.ceil(new Date(last_time).getTime()/1000/60%60)} 
          | ${Math.ceil(betwwen_time/1000/60/60)}:${Math.ceil(betwwen_time/1000/60%60)} h`
      })
    }
  }

  return data_format
}

const findDayInMonth = () => {
  list_day.value = []

  first_day.value = new Date(date_active.value.year, date_active.value.month, 1)
  last_day.value = new Date(date_active.value.year, date_active.value.month + 1, 0)

  refresh()
  
  let change_first_day = first_day.value.getDay() == 0 ? 7 : first_day.value.getDay()
  
  if (change_first_day > 1) {
    let day_of_last_month = new Date(date_active.value.year, date_active.value.month , 0).getDate()

    for (let i = 0; i < change_first_day - 1; i++) {
      let temp_time = new Date().getTime() - new Date(date_active.value.year, date_active.value.month - 1, day_of_last_month - 1).getTime()
      let check_now = temp_time >= 0 && temp_time <= 86400000
      list_day.value.push({
        day: day_of_last_month--,
        active: false,
        now: check_now,
        staffs: []
      })
    }
  }

  for (let i = 1; i <= last_day.value.getDate(); i++) {
    let temp_time = new Date().getTime() - new Date(date_active.value.year, date_active.value.month, i).getTime()
    let check_now = temp_time >= 0 && temp_time <= 86400000
    list_day.value.push({
      day: i,
      active: true,
      now: check_now,
      staffs: filterDay(i, (data_attendances.value as any).attendances)
    })
  }

  if (last_day.value.getDay() > 0) {
    for (let i = 0; i < 7 - last_day.value.getDay(); i++) {
      let temp_time = new Date().getTime() - new Date(date_active.value.year, date_active.value.month + 1, i + 1).getTime()
      let check_now = temp_time >= 0 && temp_time <= 86400000
      list_day.value.push({
        day: i + 1,
        active: false,
        now: check_now,
        staffs: []
      })
    }
  }
}

findDayInMonth()

const backMonth = () => {
  transiton_calendar.value = 'left-to-right'
  if (date_active.value.month == 0) {
    date_active.value.month = 11
    date_active.value.year = date_active.value.year - 1
  } else {
    date_active.value.month = date_active.value.month - 1
  }
}

const nextMonth = () => {
  transiton_calendar.value = 'right-to-left'
  if (date_active.value.month == 11) {
    date_active.value.month = 0
    date_active.value.year = date_active.value.year + 1
  } else {
    date_active.value.month = date_active.value.month + 1
  }
}

const resetMonth = () => {
  let now = new Date()
  let temp_time = now.getTime() - new Date(date_active.value.year, date_active.value.month, date_active.value.day).getTime()
  if (temp_time < 0) {
    transiton_calendar.value = 'left-to-right'
  } else if (temp_time > 86400000) {
    transiton_calendar.value = 'right-to-left'
  }
  date_active.value.month = now.getMonth()
  date_active.value.year = now.getFullYear()
}

const check_month_now = () => {
  let now = new Date()
  return date_active.value.day == now.getDate() 
    && date_active.value.month == now.getMonth() 
    && date_active.value.year == now.getFullYear()
}

watch(
  date_active.value,
  () => {
    findDayInMonth()
  }
)

</script>

<template>
  <container>
    <div class="flex justify-between py-6 border-b border-teal-300">
      <div class="flex-none flex items-center space-x-3">
        <span class="icon rounded bg-white p-2 text-teal-500">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
        </span>
        <h3 class="font-semibold text-lg">Calendar</h3>
      </div>

      <div class="flex-none flex items-center space-x-3 select-none">
        <span class="icon rounded bg-white p-2 text-teal-500">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
        </span>
        <span class="icon rounded bg-white p-2 text-teal-500">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M8 15h3v3h2v-3h3v-2h-3v-3h-2v3H8z"></path><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"></path></svg>
        </span>
      </div>
    </div>

    <div class="mt-6 rounded bg-white p-4">
      <div class="flex w-full justify-between">
        <div class="flex-none">
          <div class="rounded bg-teal-200 p-1 flex text-teal-600 font-semibold text-sm">
            <button class="px-3 py-2 rounded" 
              :class="calendar_tab == 'month' && 'bg-teal-600 text-white'"
              @click.prevent="calendar_tab = 'month'">Month</button>
            <button class="px-3 py-2 rounded" 
              :class="calendar_tab == 'weak' && 'bg-teal-600 text-white'"
              @click.prevent="calendar_tab = 'weak'">Weak</button>
            <button class="px-3 py-2 rounded" 
              :class="calendar_tab == 'day' && 'bg-teal-600 text-white'"
              @click.prevent="calendar_tab = 'day'">Day</button>
          </div>
        </div>

        <div v-if="weather" class="flex-none flex items-center space-x-3">
          <div class="font-semibold text-right">
            <h5 class="text-lg">{{time_format}}</h5>
            <p class="text-sm text-gray-500 pt-0.5">
              {{ weather.weather.feels_like }}°C
            </p>
          </div>
          <span class="icon w-14 h-14 text-teal-600">
            <svg v-if="weather.weather.main == 'Thunderstorm'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m10 13-1 5h2v4l3.975-6H13l1-3z"></path><path d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.244 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path></svg>

            <svg v-if="weather.weather.main == 'Drizzle'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M8 13h2v3H8zm0 4h2v3H8zm3-2h2v3h-2zm0 4h2v3h-2zm3-6h2v3h-2zm0 4h2v3h-2z"></path><path d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.245 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.582-.103.191-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path></svg>

            <svg v-if="weather.weather.main == 'Rain'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M8 13h2v7H8zm3 2h2v7h-2zm3-2h2v7h-2z"></path><path d="M18.944 10.113C18.507 6.671 15.56 4.001 12 4.001c-2.756 0-5.15 1.611-6.243 4.15C3.609 8.793 2 10.82 2 13.001c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.274 9.895 6.001 12 6.001c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path></svg>
            
            <svg v-if="weather.weather.main == 'Snow'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.244 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>

            <svg v-if="weather.weather.main == 'Clear'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M14.829 9.172c.181.181.346.38.488.592l1.658-1.119a6.063 6.063 0 0 0-1.621-1.62 5.963 5.963 0 0 0-2.148-.903 5.985 5.985 0 0 0-5.448 1.634 5.993 5.993 0 0 0-.733.889l1.657 1.119a4.017 4.017 0 0 1 2.51-1.683 3.989 3.989 0 0 1 3.637 1.091z"></path><circle cx="15.5" cy="13.5" r="1.5"></circle><circle cx="8.507" cy="13.507" r="1.493"></circle></svg>

            <svg v-if="weather.weather.main == 'Atmosphere'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z"></path></svg>

            <svg v-if="weather.weather.main == 'Clouds'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM18 17H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2z"></path></svg>
          </span>
        </div>
      </div>

      <div class="my-6 flex justify-between">
        <h5 class="text-xl font-semibold">{{ months[date_active.month] }} {{ date_active.year }}</h5>
        <div class="flex space-x-2 select-none">
          <div 
            :class="check_month_now() && 'scale-0'"
            @click.prevent="resetMonth()"
            class="icon p-1 border rounded-md border-teal-500 text-teal-600 cursor-pointer hover:bg-teal-600 hover:text-white transition-all duration-300">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path></svg>
          </div>
          <div 
            @click.prevent="backMonth()"
            class="icon p-1 border rounded-md border-teal-500 text-teal-600 cursor-pointer hover:bg-teal-600 hover:text-white">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
          </div>
          <div 
            @click.prevent="nextMonth()"
            class="icon p-1 border rounded-md border-teal-500 text-teal-600 cursor-pointer hover:bg-teal-600 hover:text-white">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
          </div>
        </div>
      </div>

      <div class="rounded-lg">
        <div class="flex bg-teal-200 text-teal-600 rounded-t-lg border border-b-0 border-teal-300">
          <div class="w-1/7 text-center p-2">Mon</div>
          <div class="w-1/7 text-center p-2">Tue</div>
          <div class="w-1/7 text-center p-2">Wed</div>
          <div class="w-1/7 text-center p-2">Thu</div>
          <div class="w-1/7 text-center p-2">Fri</div>
          <div class="w-1/7 text-center p-2">Sat</div>
          <div class="w-1/7 text-center p-2">Sun</div>
        </div>

        <div class="relative overflow-hidden">
          <transition :name="transiton_calendar">
            <div :key="date_active.month" class="grid grid-cols-7 gap-[1px] border border-teal-300 bg-teal-300 rounded-b-lg overflow-hidden">
              <div v-for="(v,i) in list_day" :key="i" class="calendar_item p-4" :class="v.now && 'now'">
                <p class="-mt-3 text-base text-right uppercase font-semibold"
                  :class="!v.active && 'text-gray-400'">{{ v.day }}</p>
                <div v-for="(staff, staff_index) in v.staffs.slice(0, 3)" :key="staff_index" class="task green">
                  <div class="line"></div>
                  <div class="text">
                    <h3 class="text-sm font-semibold">{{ staff.name }}</h3>
                    <div class="flex items-center space-x-2">
                      <div class="avatar"></div>
                      <p class="text-xs">{{ staff.hours }}</p>
                    </div>
                  </div>
                </div>
                <!-- <div class="task red">
                  <div class="line"></div>
                  <div class="text">
                    <h3 class="text-sm font-semibold">Việt Hùng</h3>
                    <div class="flex items-center space-x-2">
                      <div class="avatar"></div>
                      <p class="text-xs">07:34 - 11:35 | 02:34 h</p>
                    </div>
                  </div>
                </div>
                <div class="task yellow">
                  <div class="line"></div>
                  <div class="text">
                    <h3 class="text-sm font-semibold">Việt Hùng</h3>
                    <div class="flex items-center space-x-2">
                      <div class="avatar"></div>
                      <p class="text-xs">07:34 - 11:35 | 02:34 h</p>
                    </div>
                  </div>
                </div> -->
                <div v-if="v.staffs.length > 3" class="text-center mt-3 font-semibold text-teal-600">+{{v.staffs.length - 3}} more</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </container>
</template>

<style>
.calendar_item {
  @apply bg-white before:content-[''] before:block before:pb-[50%] before:float-left;
}

.calendar_item.now {
  @apply bg-teal-200 text-teal-600;
}


/* calendar task */
.calendar_item .task {
  @apply mt-2 p-2 rounded bg-teal-100 flex;
}
.calendar_item .task .line {
  @apply flex-none w-1.5 rounded-full bg-teal-400;
}
.calendar_item .task .text {
  @apply ml-2 flex-grow text-teal-600;
}
.calendar_item .task .avatar {
  @apply flex-none w-6 h-6 rounded-full overflow-hidden bg-teal-600;
}

.calendar_item .task.green {
  @apply mt-2 p-2 rounded bg-green-100 flex;
}
.calendar_item .task.green .line {
  @apply flex-none w-1.5 rounded-full bg-green-400;
}
.calendar_item .task.green .text {
  @apply ml-2 flex-grow text-green-600;
}
.calendar_item .task.green .avatar {
  @apply flex-none w-6 h-6 rounded-full overflow-hidden bg-green-400;
}

.calendar_item .task.yellow {
  @apply mt-2 p-2 rounded bg-yellow-100 flex;
}
.calendar_item .task.yellow .line {
  @apply flex-none w-1.5 rounded-full bg-yellow-400;
}
.calendar_item .task.yellow .text {
  @apply ml-2 flex-grow text-yellow-600;
}
.calendar_item .task.yellow .avatar {
  @apply flex-none w-6 h-6 rounded-full overflow-hidden bg-yellow-400;
}

.calendar_item .task.red {
  @apply mt-2 p-2 rounded bg-rose-100 flex;
}
.calendar_item .task.red .line {
  @apply flex-none w-1.5 rounded-full bg-rose-400;
}
.calendar_item .task.red .text {
  @apply ml-2 flex-grow text-rose-600;
}
.calendar_item .task.red .avatar {
  @apply flex-none w-6 h-6 rounded-full overflow-hidden bg-rose-400;
}

/* transition calendar */
.left-to-right-enter-active,
.left-to-right-leave-active,
.right-to-left-enter-active,
.right-to-left-leave-active {
  transition: all .5s linear;
}
.left-to-right-enter-active,
.right-to-left-enter-active
{
  @apply absolute w-full top-0 left-0;
}

.left-to-right-enter-from,
.right-to-left-leave-to {
  transform: translateX(-100%);
}
/* .left-to-right-enter-to,
.left-to-right-leave-from {
  transform: translateX(0);
} */
.left-to-right-leave-to,
.right-to-left-enter-from {
  transform: translateX(100%);
}
</style>