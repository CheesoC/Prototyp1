<!-- ProgressBar.vue -->
<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <n-space vertical>
    <n-progress
      type="line"
      :percentage="progress"
      :height="24"
      :border-radius="4"
      :fill-border-radius="0"
      indicator-placement="inside"
      color="#22C55E"
    />
  </n-space>
</template>
