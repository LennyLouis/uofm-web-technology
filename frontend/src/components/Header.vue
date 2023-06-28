<script setup>
import imageLogo from '@/assets/umich-logo.jpg'
import { ref } from 'vue';


// const imageLogoImg = ref(imageLogo)

</script>

<template>
    <v-app-bar color="#00274c">
        <v-img :width="30" height="70" max-width="100" :src="imageLogo"></v-img>
        <v-btn varient="text" color="white">Esiea Web Technology</v-btn>
        <v-btn varient="text" color="white">Login</v-btn>
        <v-btn varient="text" color="white">Register</v-btn>
    </v-app-bar>
</template>