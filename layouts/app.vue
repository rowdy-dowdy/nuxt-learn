<template>
  <div id="app" class="h-[1px] min-h-screen flex flex-col text-[#444]">
    <Header class="flex-none"/>
    
    <main class="flex-grow">
      <slot />
    </main>

    <Footer class="flex-none"/>
  </div>
</template>