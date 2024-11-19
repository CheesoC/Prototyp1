<script setup>
import hero from '@/assets/img/hero.png'
</script>

<template>
  <section class="bg-gray-300 py-10 mb-4">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <img
          :src="hero"
          alt="Hero Image"
          class="w-full max-w-md h-auto mx-auto"
        />
      </div>
    </div>
  </section>
</template>
