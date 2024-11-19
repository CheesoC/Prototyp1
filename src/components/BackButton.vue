<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="bg-blue-100">
    <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/tasks"
        class="text-blue-500 hover:text-blue-600 flex items-center font-bold"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> Back to Tasks
      </RouterLink>
    </div>
  </section>
</template>
