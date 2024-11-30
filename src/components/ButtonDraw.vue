<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['toggle-draw-tool'])
const isActive = ref(false)

const toggleDrawTool = () => {
  isActive.value = !isActive.value
  emit('toggle-draw-tool')
}
</script>

<template>
  <button
    @click="toggleDrawTool"
    :class="[
      'text-white font-bold py-2 px-4 rounded',
      isActive ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600',
    ]"
  >
    Draw
  </button>
</template>
