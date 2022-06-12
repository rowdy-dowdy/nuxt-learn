<script setup lang="ts">
definePageMeta({
  middleware: ["app"]
  // or middleware: 'auth'
})
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col text-[#444]">
    <Header class="flex-none"/>
    
    <main class="flex-grow min-h-0 bg-slate-100">
      <slot />
    </main>

    <Footer class="flex-none"/>
  </div>
</template>