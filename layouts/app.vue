<template>
  <div id="app" class="min-h-screen flex flex-col text-[#444]">
    <Header class="flex-none"/>
    
    <main class="flex-grow">
      <slot />
    </main>

    <Footer class="flex-none"/>
  </div>
</template>

<style>
  /* input, button {
    @apply focus:outline-none;
  } */

  * {
    @apply border-gray-300;
  }
</style>