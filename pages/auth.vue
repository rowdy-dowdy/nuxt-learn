<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div class="relative w-full h-full h-center px-12 py-24">
    <div class="bg-full">
      <img src="~/assets/images/background_auth.jpg" alt="background auth"
        class="w-full h-full object-cover">
      <div class="bg-full bg-white/70"></div>
    </div>
    <div class="relative w-full mx-auto max-w-7xl h-full">
      <NuxtPage/>
    </div>
  </div>
</template>