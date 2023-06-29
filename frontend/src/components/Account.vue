<script>
import { ref } from 'vue'
import { watch } from 'vue'
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

        showAlert: false,
    }),
    methods: {
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

                    this.showAlert = true;

                    setTimeout(() => {
                        this.showAlert = false; 
                    }, 2000);

                    // this.$router.push(`/`)
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

                <v-alert
                    v-model="showAlert"
                    type="success"
                    dismissible
                    transition="scale-transition"
                    :timeout="2000">
                        Form submitted successfully!
                </v-alert>
            </v-card-text>
        </v-card>
    </div>
</template>