<script setup lang="ts">
const { data } = await useFetch('http://localhost:3000/api/test', {method: 'get'})
console.log(data.value)
</script>

<template>
  <Container class="py-6">
    <p class="text-blue-600">{{ data }}</p>
  </Container>
</template>