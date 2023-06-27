<script setup>
import { ref } from 'vue'
const image = ref('../assets/umich-logo.jpg')
</script>

<template>
    <v-app-bar app color="#00274c" dark>
        <v-img :src="image"></v-img>
        <v-btn color="white">Esiea Web Tech</v-btn>
        <v-btn color="white">Login</v-btn>
        <v-btn color="white">Register</v-btn>
    </v-app-bar>
</template>