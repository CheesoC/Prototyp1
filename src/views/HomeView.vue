<script setup>
import HeroItem from '@/components/HeroItem.vue'
import TaskListings from '@/components/TaskListings.vue'
import ImpressumItem from '@/components/ImpressumItem.vue'
import NavbarItem from '@/components/NavbarItem.vue'
</script>

<template>
  <NavbarItem />
  <HeroItem />
  <TaskListings :limit="3" :showButton="true" />
  <ImpressumItem />
</template>
