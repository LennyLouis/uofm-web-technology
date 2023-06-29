<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>

<v-app>
  <v-main>
    <Header />
    <!-- <SideBar /> -->
    <RouterView />
    <Footer />
  </v-main>
  </v-app>

</template>

<style scoped>

</style>
