<script setup>
const links = [
  {title: "Home", path: "/"},
  {title: "About", path: "/about"},
  {title: "Todo", path: "/todo"},
  {title: "Contact", path: "/contact"}
]
</script>

<template>
  <header class="bg-white py-6 border-b shadow-md">
    <Container>
      <div class="flex justify-between items-center">
        <div class="flex-none">
          <h1 class="text-xl">Việt Hùng</h1>
        </div>

        <ul class="flex items-center">
          <li v-for="(link, index) in links" :key="index" class="link">
            <nuxt-link :to="link.path">{{link.title}}</nuxt-link>
          </li>
        </ul>
      </div>
    </Container>
  </header>
</template>

<style>
  .link a {
    @apply relative px-4 py-3;
  }
  .link a::after {
    @apply content-['/'] absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 text-[#444];
  }
  .link:last-child a:after {
    @apply content-none;
  }

  .link a.router-link-active {
    @apply text-blue-500;
  }
</style>