<script setup>
import NavbarItem from '@/components/NavbarItem.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <NavbarItem />
  <section
    class="text-center flex flex-col justify-center items-center min-h-[24rem] sm:h-96"
  >
    <div class="mt-8 sm:mt-10 flex flex-col items-center">
      <i
        class="pi pi-cog text-blue-500 text-4xl sm:text-6xl mb-2 sm:mb-3 animate-spin"
      ></i>
      <p class="text-xl sm:text-2xl font-semibold">Work in Progress</p>
      <p class="text-base sm:text-lg">
        We are working hard to bring you new features. Stay tuned!
      </p>
    </div>
    <RouterLink
      to="/"
      class="text-white bg-blue-700 hover:bg-blue-900 rounded-md px-3 py-2 mt-4"
      >Go Back</RouterLink
    >
  </section>
</template>
