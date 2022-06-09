<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
  *:not(svg,path) {
    @apply border-gray-300 text-[#444];
  }

  svg {
    @apply !fill-current text-inherit;
  }

  input {
    @apply focus:ring-0 focus:outline-none selection:bg-transparent;
  }

  input:-internal-autofill-selected {
    @apply bg-red-500;
  }
</style>