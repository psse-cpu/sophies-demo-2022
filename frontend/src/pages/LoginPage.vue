<template>
  <q-page class="col q-pa-none">
    <div class="row q-pa-md">
      <div class="col-xs-12 col-md">
        <login-jumbotron />
      </div>
      <div class="bg-blue-grey-1 col-xs-12 col-md q-pa-md row">
        <form class="col-md-8 col-xs-12" @submit.prevent="login">
          <h6 class="q-mt-none q-mb-none">Already on ShipThat?</h6>

          <q-banner v-if="authError" class="bg-red-9 text-left text-white">
            <template v-slot:avatar>
              <q-icon name="mdi-lock" color="white" />
            </template>
            {{ authError }}
          </q-banner>

          <div class="q-ma-md">
            <q-input
              dense
              rounded
              outlined
              v-model="credentials.email"
              label="E-mail or username"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>
          </div>
          <div class="q-ma-md">
            <q-input
              dense
              rounded
              outlined
              v-model="credentials.password"
              label="Password"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-key" />
              </template>
            </q-input>
          </div>
          <div class="q-ma-md flex buttons">
            <q-btn
              :loading="isLoading"
              type="submit"
              icon="mdi-login"
              color="primary"
              size="md"
              unelevated
              rounded
              style="width: 100%"
            >
              Sign-in
            </q-btn>
          </div>

          <q-separator />

          <p class="q-mt-md">Other ways to sign-in:</p>

          <div class="q-ma-md flex buttons">
            <div id="googleSignIn"></div>
          </div>
        </form>
      </div>
    </div>
    <ship-that-features />
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import LoginJumbotron from 'src/components/LoginJumbotron.vue'

import { addGoogleSignInButton } from 'src/auth-strategies/google-auth'
import { backend } from 'src/axios'

import localforage from 'localforage'
import { useRoute, useRouter } from 'vue-router'
import { UserWithoutHash } from 'backend/src/users/user.entity'
import { AxiosError } from 'axios'
import ShipThatFeatures from '../components/ShipThatFeatures.vue'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const authError = ref('')

const saveUserAndRedirect = ({ data: user }) => {
  localforage.setItem('currentUser', user)
  router.push(route.redirectedFrom?.fullPath ?? '/')
}
onMounted(() => {
  addGoogleSignInButton((response) => {
    backend
      .post(
        '/auth/google',
        {},
        {
          headers: {
            Authorization: `Bearer ${response.credential}`,
          },
        }
      )
      .then(saveUserAndRedirect)
      .catch((error: AxiosError) => {
        authError.value =
          error.response?.status === 401
            ? 'Google sign-in failed.'
            : 'Unexpected error occurred.'
      })
  })
})

const credentials = reactive({
  email: '',
  password: '',
})

const login = async () => {
  isLoading.value = true
  backend
    .post<UserWithoutHash>('/auth/login', credentials)
    .then(saveUserAndRedirect)
    .catch((error: AxiosError) => {
      console.log('error', error)
      authError.value =
        error.response?.status === 401
          ? 'Invalid username or password.'
          : 'Unexpected error occurred.'
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<style scoped lang="scss">
form {
  margin-left: auto;
  margin-right: auto;
}

#googleSignIn iframe {
  display: none !important;
}
</style>
