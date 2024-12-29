<script setup>
import HeroItem from '@/components/HeroItem.vue'
import TopicListings from '@/components/TopicListings.vue'
import ImpressumItem from '@/components/ImpressumItem.vue'
import NavbarItem from '@/components/NavbarItem.vue'
</script>

<template>
  <div style="padding-top: 5rem">
    <NavbarItem />
    <HeroItem />
    <TopicListings :limit="3" :showButton="true" :showSearchBar="false" />
    <ImpressumItem />
  </div>
</template>
