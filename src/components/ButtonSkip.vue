<script setup></script>

<script setup>
const emit = defineEmits(['skip'])

const handleSkip = () => {
  emit('skip')
}
</script>

<template>
  <button
    @click="handleSkip"
    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
  >
    Skip
  </button>
</template>
