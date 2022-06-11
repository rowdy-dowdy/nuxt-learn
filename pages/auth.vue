<script setup lang="ts">
definePageMeta({
  layout: "auth",

  key: route => route.path,

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
    <div class="relative w-full h-full mx-auto max-w-7xl">
      <!-- <transition> -->
        <nuxt-page />
      <!-- </transition> -->
    </div>
  </div>
</template>

<style>
  /* .auth-enter-active {
  transition: all 3s ease;
  }
  .auth-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .auth-enter, .auth-leave-to
  {
    transform: translateX(10px);
    opacity: 0;
  } */
</style>