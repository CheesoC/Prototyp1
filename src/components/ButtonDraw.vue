<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['toggle-draw-tool'])

const toggleDrawTool = () => {
  emit('toggle-draw-tool')
}
</script>

<template>
  <button
    @click="toggleDrawTool"
    class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
  >
    Draw
  </button>
</template>
