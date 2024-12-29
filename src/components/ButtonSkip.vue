<script setup>
import { ref } from 'vue'

const emit = defineEmits(['skip'])
const isDisabled = ref(false)

const handleSkip = () => {
  if (isDisabled.value) return

  isDisabled.value = true
  emit('skip')

  setTimeout(() => {
    isDisabled.value = false
  }, 1000) // Adjust the debounce time as needed
}
</script>

<template>
  <button
    @click="handleSkip"
    :disabled="isDisabled"
    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
  >
    Skip
  </button>
</template>
