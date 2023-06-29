<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Home from './components/Home.vue';

import { RouterView} from 'vue-router';


</script>

<template>
  <v-app>
    <v-main>
      <Header />

      <RouterView />
      <Footer />

      
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
