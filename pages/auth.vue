<script setup lang="ts">
definePageMeta({
  layout: "auth",

  // key: route => route.fullPath,

  // transition: {
  //   name: 'auth',
  //   mode: 'out-in'
  // },

  keepalive: {
    exclude: ['modal']
  },
});

// const route = useRoute()

// watch(
//   () => route.path,
//   (path) => {
//     console.log(path)
//   }
// )

</script>

<template>
  <div class="relative w-full h-full px-12 py-24">
    <div class="bg-full">
      <img src="~/assets/images/background_auth.jpg" alt="background auth"
        class="w-full h-full object-cover">
      <div class="bg-full bg-white/70"></div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <transition name="auth">
        <div :key="$route.fullPath">
          <nuxt-page :key="$route.fullPath"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
  .auth-enter-active,
  .auth-leave-active {
    @apply transition-all duration-1000;
  }
  
  .auth-enter-to, .auth-leave-to
  {
    @apply absolute w-full top-0 left-0;
  }

  .auth-enter-to
  {
    @apply z-50;
  }

  /* left */
  .auth-enter-from .left {
    @apply transition-all duration-1000 -translate-x-full;
  }

  .auth-enter-to .left {
    @apply transition-all duration-1000 translate-x-0;
  }

  /* right */
  .auth-enter-from .right {
    @apply transition-all duration-1000 translate-x-full;
  }

  .auth-enter-to .right {
    @apply transition-all duration-1000 translate-x-0;
  }
</style>