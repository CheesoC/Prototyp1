<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
  level: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative p-4">
    <div class="p-4">
      <RouterLink
        :to="`/topics/${props.topic.id}/level/${props.level.level}`"
        class="block"
      >
        <div
          class="bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 h-auto min-h-[150px] rounded-lg flex flex-col items-center justify-center text-center cursor-pointer"
        >
          <slot></slot>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
