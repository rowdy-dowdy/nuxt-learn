<script setup lang="ts">
const email_input    = ref('')
const password_input = ref('')
const is_remember    = ref(false)

</script>

<template>
  <div class="flex w-full h-full rounded-2xl shadow-lg overflow-hidden border border-gray-200">
    <div class="left hidden lg:flex w-1/2 bg-blue-700/90 rounded overflow-hidden h-center">
      <auth-slide></auth-slide>
    </div>

    <div class="right flex-grow min-w-0 bg-white px-6 py-8">
      <div class="flex flex-col w-full h-full max-w-xs mx-auto">
        <div class="mt-12">
          <span class="grid w-16 h-16 mx-auto rounded-full bg-gray-100 border border-gray-200 place-items-center text-indigo-600">
            <svg class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M3 11v8h.051c.245 1.692 1.69 3 3.449 3 1.174 0 2.074-.417 2.672-1.174a3.99 3.99 0 0 0 5.668-.014c.601.762 1.504 1.188 2.66 1.188 1.93 0 3.5-1.57 3.5-3.5V11c0-4.962-4.037-9-9-9s-9 4.038-9 9zm6 1c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm6-4c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path></svg>
          </span>
        </div>

        <h3 class="mt-4 text-3xl text-center font-semibold">Hello Again!</h3>
        <p class="mt-2 text-gray-400 text-sm text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

        <form action="" class="mt-12 flex flex-col">
          <form-input v-model:text="email_input">
            <template #label>
              Email
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.466 0 2.961-.371 4.442-1.104l-.885-1.793C14.353 19.698 13.156 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1c0 .692-.313 2-1.5 2-1.396 0-1.494-1.819-1.5-2V8h-2v.025A4.954 4.954 0 0 0 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.45 0 2.748-.631 3.662-1.621.524.89 1.408 1.621 2.838 1.621 2.273 0 3.5-2.061 3.5-4v-1c0-5.514-4.486-10-10-10zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"></path></svg>
            </template>
          </form-input>

          <formInput class="mt-5" v-model:text="password_input" type="password">
            <template #label>
              Password
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm9.002 13H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z"></path></svg>
            </template>
          </formInput>

          <div class="mt-4 flex justify-between">
            <form-checkbox v-model:check="is_remember">
              <template #label>Remember Me</template>
            </form-checkbox>

            <a href="#" class="text-sm text-blue-500 font-semibold">Recovery Password</a>
          </div>

          <button class="mt-12 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-semibold">Login</button>
          <button class="mt-4 flex items-center justify-center space-x-2 border bg-white hover:bg-gray-200 px-6 py-2 rounded font-semibold text-gray-500">
            <div class="icon text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path></svg>
            </div>
            <span>Sign in with Goole</span>
          </button>
        </form>

        <div class="mt-auto pt-12 text-center font-semibold">
          <span class="text-gray-500">Don't have an account yet?</span>
          <nuxt-link to="/auth/register" class="text-blue-600 pl-4">Sign Up</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>