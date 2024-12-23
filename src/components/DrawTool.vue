<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let drawing = false
let backupCanvas = null
let backupCtx = null
let originalWidth = 0
let originalHeight = 0

const initializeBackupCanvas = () => {
  backupCanvas = document.createElement('canvas')
  backupCtx = backupCanvas.getContext('2d')
}

const saveDrawing = () => {
  if (!backupCanvas || !canvasRef.value) return

  // Store original dimensions
  originalWidth = canvasRef.value.width
  originalHeight = canvasRef.value.height

  backupCanvas.width = originalWidth
  backupCanvas.height = originalHeight
  backupCtx.drawImage(canvasRef.value, 0, 0)
}

const restoreDrawing = () => {
  if (!backupCanvas || !canvasRef.value) return

  // Calculate scale factors
  const scaleX = canvasRef.value.width / originalWidth
  const scaleY = canvasRef.value.height / originalHeight

  // Clear current canvas
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // Scale and draw
  ctx.save()
  ctx.scale(scaleX, scaleY)
  ctx.drawImage(backupCanvas, 0, 0)
  ctx.restore()
}

const setCanvasSize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  saveDrawing()

  const parent = canvas.parentElement
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight

  ctx = canvas.getContext('2d')
  restoreDrawing()
}

const startDrawing = event => {
  drawing = true
  draw(event)
}

const endDrawing = () => {
  drawing = false
  ctx.beginPath()
  saveDrawing()
}

const draw = event => {
  if (!drawing) return

  ctx.lineWidth = 3
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

const startTouchDrawing = event => {
  event.preventDefault()
  drawing = true
  const touch = event.touches[0]
  const rect = canvasRef.value.getBoundingClientRect()
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top

  ctx.beginPath()
  ctx.moveTo(x, y)
}

const drawTouch = event => {
  event.preventDefault()
  if (!drawing) return

  const touch = event.touches[0]
  const rect = canvasRef.value.getBoundingClientRect()
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top

  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'black'

  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y)
}

const endTouchDrawing = event => {
  event.preventDefault()
  drawing = false
  ctx.beginPath()
  saveDrawing()
}

onMounted(() => {
  initializeBackupCanvas()
  setCanvasSize()
  window.addEventListener('resize', setCanvasSize)

  const canvas = canvasRef.value
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', endDrawing)
  canvas.addEventListener('mouseleave', endDrawing)

  canvas.addEventListener('touchstart', startTouchDrawing, { passive: false })
  canvas.addEventListener('touchmove', drawTouch, { passive: false })
  canvas.addEventListener('touchend', endTouchDrawing)
  canvas.addEventListener('touchcancel', endTouchDrawing)
})
</script>

<template>
  <div class="draw-tool-container">
    <canvas ref="canvasRef" class="draw-canvas"></canvas>
  </div>
</template>

<style scoped>
.draw-tool-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.draw-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

/* DAS MUSS UNBEDINGT IN STYLES:CSS ausgekapselt werden*/
.level-view-container {
  position: relative;
}

.back-button {
  position: relative;
  z-index: 20; /* Ensure it is above the draw tool */
}

.level-buttons {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20; /* Ensure it is above the draw tool */
}

.draw-tool {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5; /* Ensure it is below the buttons */
  background: rgba(
    255,
    255,
    255,
    0.5
  ); /* Optional: Add a background to distinguish it */
}
</style>
