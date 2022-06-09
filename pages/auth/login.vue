<template>
  <div class="flex h-full rounded-2xl shadow-lg overflow-hidden border border-gray-200">
    <div class="hidden lg:block w-1/2 bg-blue-700/90 rounded overflow-hidden">
      
    </div>

    <div class="flex-grow min-w-0 bg-white px-6 py-8">
      <div class="w-full max-w-xs mx-auto">
        <div class="mt-12">
          <span class="grid w-16 h-16 mx-auto rounded-full bg-gray-100 border border-gray-200 place-items-center text-indigo-600">
            <svg class="w-10 h-10" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M3 11v8h.051c.245 1.692 1.69 3 3.449 3 1.174 0 2.074-.417 2.672-1.174a3.99 3.99 0 0 0 5.668-.014c.601.762 1.504 1.188 2.66 1.188 1.93 0 3.5-1.57 3.5-3.5V11c0-4.962-4.037-9-9-9s-9 4.038-9 9zm6 1c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm6-4c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path></svg>
          </span>
        </div>

        <h3 class="mt-4 text-3xl text-center font-semibold">Hello Again!</h3>
        <p class="mt-2 text-gray-400 text-sm text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

        <form action="" class="mt-6 flex flex-col">
          <baseInput>
            <template #label>
              Email
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.466 0 2.961-.371 4.442-1.104l-.885-1.793C14.353 19.698 13.156 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1c0 .692-.313 2-1.5 2-1.396 0-1.494-1.819-1.5-2V8h-2v.025A4.954 4.954 0 0 0 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.45 0 2.748-.631 3.662-1.621.524.89 1.408 1.621 2.838 1.621 2.273 0 3.5-2.061 3.5-4v-1c0-5.514-4.486-10-10-10zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"></path></svg>
            </template>
          </baseInput>
        </form>
      </div>
    </div>
  </div>
</template>