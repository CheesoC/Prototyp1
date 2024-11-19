<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative p-4">
    <div class="p-4">
      <RouterLink to="/level/1" class="block">
        <div
          class="bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 h-auto min-h-[150px] rounded-lg flex flex-col items-center justify-center text-center cursor-pointer"
        >
          <h2 class="text-2xl font-bold mb-2 text-white">Level 1</h2>
          <slot></slot>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
