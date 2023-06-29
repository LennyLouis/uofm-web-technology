<script>
import UserService from '@/services/UserService'
export default {
  data: () => ({
    userName: '',
    userNameRules: [(v) => !/^\s*$/.test(v) || 'User name is required'],
    lastName: '',
    lastNameRules: [(v) => !/^\s*$/.test(v) || 'Last name is required'],
    firstName: '',
    firstNameRules: [(v) => !/^\s*$/.test(v) || 'First name is required'],
    password: '',
    passwordRules: [(v) => !/^\s*$/.test(v) || 'password is required'],
    loading: false,
    confirmPassword: '',
    confirmPasswordRules: [(v) => !/^\s*$/.test(v) || 'confirm password is required'],
    email: '',
    emailRules: [(v) => /.+@.+\..+/.test(v) || 'Invalid Email']
  }),
  methods: {
    async submit(event) {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.password !== this.confirmPassword) {
          console.log(JSON.stringify(this.$refs.form))
          alert('password and confirm password mush be same')
          return false
        }
        this.loading = true
        const { success, error } = await UserService.register({
          username: this.userName,
          firstname: this.firstName,
          lastname: this.lastName,
          email: this.email,
          password: this.password
        })
        if (!success) {
          alert(error)
          this.loading = false
        } else {
          this.$router.push(`/login`)
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex-card">
    <v-card class="mx-auto" title="Register" max-width="700">
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-text-field v-model="firstName" label="Enter first name" :rules="firstNameRules" required></v-text-field>
          <v-text-field v-model="lastName" label="Enter last name" :rules="lastNameRules" required></v-text-field>
          <v-text-field v-model="userName" label="Enter user name" :rules="userNameRules" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password"
            required></v-text-field>

          <v-text-field v-model="confirmPassword" label="Confirm Password" :rules="confirmPasswordRules" type="password"
            required></v-text-field>

          <v-checkbox v-model="checkbox" label="Agree ?"></v-checkbox>

          <v-btn color="indigo" :loading="loading" type="submit" block class="mt-2" text="Register"></v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

