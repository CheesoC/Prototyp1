<script setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/logo.png'

const isActiveLink = routePath => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <nav class="bg-blue-700 border-b border-blue-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative flex h-auto min-h-[5rem] items-center justify-between flex-wrap"
      >
        <!-- Logo Section -->
        <div class="flex flex-1 items-center justify-between flex-wrap">
          <RouterLink class="flex flex-shrink-0 items-center space-x-2" to="/">
            <img class="h-8 sm:h-10 w-auto" :src="logo" alt="Ez Math Logo" />
            <span
              class="hidden sm:block text-white text-xl sm:text-2xl font-bold"
              >Ez Math</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-blue-900' : '',
                  'hover:bg-blue-900',
                  'hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-bold',
                  'ml-2',
                ]"
                >HOME</RouterLink
              >
              <RouterLink
                to="/tasks"
                :class="[
                  isActiveLink('/tasks') ? 'bg-blue-900' : '',
                  'hover:bg-blue-900',
                  'hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-bold',
                  'ml-2',
                ]"
                >TASKS</RouterLink
              >

              <RouterLink
                to="/progress"
                :class="[
                  isActiveLink('/progress') ? 'bg-blue-900' : '',
                  'hover:bg-blue-900',
                  'hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-bold',
                  'ml-2',
                ]"
                >PROGRESS</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
