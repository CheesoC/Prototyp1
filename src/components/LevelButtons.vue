<script setup>
import ButtonDraw from '@/components/ButtonDraw.vue'
import ButtonSkip from '@/components/ButtonSkip.vue'
import Buttonsolve from '@/components/ButtonSolve.vue'
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-300 shadow-md py-4">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
      <ButtonDraw />
      <ButtonSkip />
      <Buttonsolve />
    </div>
  </div>
</template>
