<script setup lang="ts">
const config = useRuntimeConfig();
// console.log(config.app_url)
const { data } = await useFetch(`${config.app_url}/api/hello`, {method: 'get'})
</script>

<template>
  <Container class="py-6">
    <p class="text-blue-600">{{ data }}</p>
  </Container>
</template>