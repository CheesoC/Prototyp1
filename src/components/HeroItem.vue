<script setup>
import hero from '@/assets/img/hero.png'
</script>

<template>
  <section class="bg-gray-100 border-b border-gray-900 py-10 sm:py-12">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <img
          :src="hero"
          alt="Hero Image"
          class="w-full max-w-sm h-auto mx-auto"
        />
      </div>
    </div>
  </section>
</template>
