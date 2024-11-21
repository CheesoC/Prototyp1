<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let ctx = null
let drawing = false

const startDrawing = event => {
  drawing = true
  draw(event)
}

const endDrawing = () => {
  drawing = false
  ctx.beginPath()
}

const draw = event => {
  if (!drawing) return
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'black'

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y)
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  canvasRef.value.width = canvasRef.value.offsetWidth
  canvasRef.value.height = canvasRef.value.offsetHeight

  canvasRef.value.addEventListener('mousedown', startDrawing)
  canvasRef.value.addEventListener('mouseup', endDrawing)
  canvasRef.value.addEventListener('mousemove', draw)
})

onBeforeUnmount(() => {
  canvasRef.value.removeEventListener('mousedown', startDrawing)
  canvasRef.value.removeEventListener('mouseup', endDrawing)
  canvasRef.value.removeEventListener('mousemove', draw)
})
</script>

<template>
  <div class="absolute inset-0 z-40">
    <canvas
      ref="canvasRef"
      class="w-full h-full rounded-lg border border-gray-300"
    ></canvas>
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
}
</style>
