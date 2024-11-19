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
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
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

              <RouterLink
                to="/about"
                :class="[
                  isActiveLink('/about') ? 'bg-blue-900' : '',
                  'hover:bg-blue-900',
                  'hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-bold',
                  'ml-2',
                ]"
                >ABOUT</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
