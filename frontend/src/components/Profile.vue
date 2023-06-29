<script>
export default {
  data: () => ({
    userName: '',
    userNameRules: [
      (value) => {
        if (value?.length > 3) return true

        return 'UserName must be at least 3 characters.'
      }
    ],
    password: '',
    passwordRules: [
      (value) => {
        if (/[^0-9]/.test(value)) return true

        return 'Last name can not contain digits.'
      }
    ],
    loading: false,
    isRememberMe: false
  }),
  methods: {
    async submit(event) {
      this.loading = true

      alert('akdghkjdf')

      this.loading = false
    }
  }
}
</script>

<template>
  <v-banner lines="two" icon="mdi-account" color="indigo-darken-4" class="my-4">
    <v-banner-text> "Welcome to your User Profile Page " </v-banner-text>
  </v-banner>
  <div class="flex-card">
    <v-card class="mx-auto" title="User Profile" max-width="1200">
      <v-card-text>
        <v-form fast-fail @submit.prevent="submit">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal first name*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal middle name"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="[
                  'Skiing',
                  'Ice hockey',
                  'Soccer',
                  'Basketball',
                  'Hockey',
                  'Reading',
                  'Writing',
                  'Coding',
                  'Basejump'
                ]"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-btn
            color="indigo"
            :loading="loading"
            type="submit"
            block
            class="mt-2"
            text="Update Profile"
          ></v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
