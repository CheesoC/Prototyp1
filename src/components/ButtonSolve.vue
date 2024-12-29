<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['checkSolution'])
const isDisabled = ref(false)
const formRef = ref(null)

function handleClick() {
  if (isDisabled.value) return

  isDisabled.value = true
  emit('checkSolution')

  setTimeout(() => {
    isDisabled.value = false
  }, 1500) // Adjust the debounce time as needed
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    handleClick()
  }
}

function handleSubmit(event) {
  event.preventDefault()
  handleClick()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (formRef.value) {
    formRef.value.addEventListener('submit', handleSubmit)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (formRef.value) {
    formRef.value.removeEventListener('submit', handleSubmit)
  }
})
</script>

<template>
  <form ref="formRef">
    <button
      @click="handleClick"
      :disabled="isDisabled"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      Solve
    </button>
  </form>
</template>
