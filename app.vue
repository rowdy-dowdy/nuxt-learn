<script lang="ts" setup>
import './assets/css/tailwind.css'
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
  html, body {
    @apply text-[#444];
  }

  * {
    @apply border-gray-300;
  }

  svg {
    @apply !fill-current;
  }

  input {
    @apply focus:ring-0 focus:outline-none selection:bg-transparent;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px var(--bg-input, #fff) inset !important;
  }
</style>