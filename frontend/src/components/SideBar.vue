<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AuthService from '@/services/AuthService'
import { useAuthStore } from '@/stores/auth'
const user = ref(AuthService.getUser())
const { setIsLoggedIn } = useAuthStore()

const router = useRouter()
const navigate = (routePath) => {
  router.push(`/${routePath}`)
}
const logout = () => {
  AuthService.logout()
  setIsLoggedIn(false)
  router.push(`/login`)
}

</script>

<template>
  <v-navigation-drawer rail location="left">

    <v-tooltip text="Tooltip">
      <template v-slot:activator="{ props }">
        <!-- DIV IN SIDE BAR -->
        <div v-bind="props" @click="navigate('account')">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          <v-list>
            <v-list-item :title="user.firstname[0] + user.lastname[0]" :subtitle="user.email"></v-list-item>
          </v-list>
        </div>
      </template>
      <!-- DIV SHOWED IN TOOLTIP -->
      <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
      <v-list>
        <v-list-item :title="user.firstname + ' ' + user.lastname" :subtitle="user.email"></v-list-item>
      </v-list>
    </v-tooltip>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" @click="navigate('')" value="home">
        <v-tooltip activator="parent" location="right">Home</v-tooltip>
      </v-list-item>
      <!-- <v-list-item
        prepend-icon="mdi-account"
        title="My Account"
        @click="navigate('account')"
        value="account"
      ></v-list-item> -->
      <v-list-item prepend-icon="mdi-folder-multiple-image" @click="navigate('myImages')" value="myImages">
        <v-tooltip activator="parent" location="right">My Images</v-tooltip>
      </v-list-item>
      <v-list-item prepend-icon="mdi-image-plus-outline" @click="navigate('addImage')" value="addImage">
        <v-tooltip activator="parent" location="right">Add Image</v-tooltip>
      </v-list-item>
      <!-- <v-list-item
        prepend-icon="mdi-cloud-upload"
        title="Upload Files"
        @click="navigate('uploadFiles')"
        value="uploadFiles"
      ></v-list-item> -->
      <v-list-item prepend-icon="mdi-image" @click="navigate('imageGallery')" value="imageGallery">
        <v-tooltip activator="parent" location="right">Image Gallery</v-tooltip>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-logout" @click="logout()">
          <v-tooltip activator="parent" location="right">Logout</v-tooltip>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
