<script setup>
import imageLogo from '@/assets/images/umich-logo.jpg'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import AuthService from '@/services/AuthService'
import { useTheme } from "vuetify";

const theme = useTheme();
const darkMode = ref(false);

const toggleTheme = () => {
  theme.global.name.value = darkMode.value ? "dark" : "light";
};

const router = useRouter();
const imageLogoImg = ref(imageLogo)

const navigate = (routePath) => {
  router.push(`/${routePath}`)
}

const auth = useAuthStore()

onMounted(() => {
  if (AuthService.isLoggedIn()) {
    auth.setIsLoggedIn(true)
    router.push(`/`)
  }
})
</script>

<template>
  <v-app-bar color="#00274c">
    <v-img width="30" height="70" max-width="100" :src="imageLogoImg"></v-img>
    <v-btn variant="text" color="white" @click="navigate('')"> Esiea Web Technology
      <v-tooltip activator="parent" location="bottom">Home</v-tooltip>
    </v-btn>
    <v-btn variant="text" v-if="!auth.isLoggedIn" color="white" @click="navigate('login')"> Login </v-btn>
    <v-btn variant="text" color="white" @click="navigate('register')"> Register </v-btn>


    <v-icon color="white" style="padding-left: 60%;">mdi-white-balance-sunny</v-icon>
    <v-switch inset color="info" style="padding: 20px 0 0 50px;" v-model="darkMode" @change="toggleTheme()"
      max-width="50px">
    </v-switch>
    <v-icon color="white">mdi-moon-waning-crescent</v-icon>

  </v-app-bar>
</template>

<style>
.theme-switcher {
  margin-left: 10px;
}
</style>