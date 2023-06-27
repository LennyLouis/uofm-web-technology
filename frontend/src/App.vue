<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue';

import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-app>
    <Header />
    <SideBar  />
    <RouterView/>
    <Footer />
</v-app>
</template>
