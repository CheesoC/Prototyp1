<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="text-center flex flex-col justify-center items-center min-h-[24rem] sm:h-96"
  >
    <i
      class="pi pi-exclamation-triangle text-yellow-500 text-6xl sm:text-8xl mb-3 sm:mb-5"
    ></i>
    <h1 class="text-4xl sm:text-6xl font-bold mb-2 sm:mb-4">404 Not Found</h1>
    <p class="text-lg sm:text-xl mb-3 sm:mb-5">This page does not exist</p>
    <RouterLink
      to="/"
      class="text-white bg-blue-700 hover:bg-blue-900 rounded-md px-3 py-2 mt-4"
      >Go Back</RouterLink
    >
  </section>
</template>
