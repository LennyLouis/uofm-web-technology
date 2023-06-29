<script setup>
import AuthService from '@/services/AuthService'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { setIsLoggedIn } = useAuthStore()

const state = reactive({
  username: '',
  password: '',
  loading: false,
  isRememberMe: false
})

onMounted(() => {
  if (AuthService.isLoggedIn()) {
    setIsLoggedIn(true)
    router.push(`/`)
  }
})
const submit = async (event) => {
  state.loading = true
  const res = await AuthService.login(
    { username: state.username, password: state.password },
    state.isRememberMe
  )
  if (!res.success) {
    alert(res.error)
    state.loading = false
  } else {
    setIsLoggedIn(true)
    router.push(`/`)
  }
}
</script>

<template>
  <div class="flex-card">
    <v-card class="mx-auto" title="Login" max-width="700">
      <v-card-text>
        <v-form fast-fail @submit.prevent="submit">
          <v-text-field v-model="state.username" label="Enter username or email"></v-text-field>

          <v-text-field v-model="state.password" label="Password" type="password"></v-text-field>

          <v-checkbox v-model="state.isRememberMe" label="Remember Me?"></v-checkbox>

          <v-btn
            color="indigo"
            :loading="state.loading"
            type="submit"
            block
            class="mt-2"
            text="Signin"
          ></v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

