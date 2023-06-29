<!-- <script setup>
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

const firstName = ref(user.value.firstname)
const lastName = ref(user.value.lastname)
const userName = ref(user.value.username)
const email = ref(user.value.email)
const loading = false

const firstNameRules = ref([
    (v) => !!v || 'First name is required',
    (v) => (v && v.length <= 10) || 'First name must be less than 10 characters',
])

const lastNameRules = ref([
    (v) => !!v || 'Last name is required',
    (v) => (v && v.length <= 10) || 'Last name must be less than 10 characters',
])

const userNameRules = ref([
    (v) => !!v || 'User name is required',
    (v) => (v && v.length <= 10) || 'User name must be less than 10 characters',
])

const emailRules = ref([
    (v) => !!v || 'E-mail is required',
    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])



</script> -->

<script>
import { ref } from 'vue'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import { useAuthStore } from '@/stores/auth'
const user = ref(AuthService.getUser())

export default {
    data: () => ({
        userName: user.value.username,
        lastName: user.value.lastname,
        firstName: user.value.firstname,
        email: user.value.email,
        loading: false,
        userNameRules: [(v) => !/^\s*$/.test(v) || 'User name is required'],
        lastNameRules: [(v) => !/^\s*$/.test(v) || 'Last name is required'],
        firstNameRules: [(v) => !/^\s*$/.test(v) || 'First name is required'],
        emailRules: [(v) => /.+@.+\..+/.test(v) || 'Invalid Email'],
    }),
    methods: {
        // this is the account register function

        // async submit(event) {
        //   const { valid } = await this.$refs.form.validate()
        //   if (valid) {
        //     if (this.password !== this.confirmPassword) {
        //       console.log(JSON.stringify(this.$refs.form))
        //       alert('password and confirm password mush be same')
        //       return false
        //     }
        //     this.loading = true
        //     const { success, error } = await UserService.register({
        //       username: this.userName,
        //       firstname: this.firstName,
        //       lastname: this.lastName,
        //       email: this.email,
        //       password: this.password
        //     })
        //     if (!success) {
        //       alert(error)
        //       this.loading = false
        //     } else {
        //       this.$router.push(`/login`)
        //     }
        //   }
        // } 

        // write the update profile info sumbit function
        async submit(event) {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.loading = true
                const { success, error } = await UserService.update({
                    user: user.value._id,
                    newInfo: {
                        username: this.userName,
                        firstname: this.firstName,
                        lastname: this.lastName,
                        email: this.email
                    }
                })
                if (!success) {
                    alert(error)
                    this.loading = false
                } else {
                    this.$router.push(`/`)
                }
            }
        }

    }
}
</script>

<template>
    <div class="flex-card">
        <v-card class="mx-auto" title="Modify account" max-width="700">
            <v-card-text>
                <v-form ref="form" @submit.prevent="submit">
                    <v-text-field v-model="firstName" label="First name" :rules="firstNameRules" required></v-text-field>

                    <v-text-field v-model="lastName" label="Last name" :rules="lastNameRules" required></v-text-field>

                    <v-text-field v-model="userName" label="User name" :rules="userNameRules" required></v-text-field>

                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                    <v-btn color="indigo" :loading="loading" type="submit" block class="mt-2" text="Confirm update"></v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
  
  