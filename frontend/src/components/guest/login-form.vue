<template>
  <form
    data-testid="login-form"
    class="col-md-8 col-xs-12"
    @submit.prevent="login"
  >
    <h6 class="q-mt-none q-mb-none">Already on ShipThat?</h6>

    <q-banner
      v-if="authError"
      data-testid="auth-errors"
      class="bg-red-9 text-left text-white"
    >
      <template v-slot:avatar>
        <q-icon name="mdi-lock" color="white" />
      </template>
      {{ authError }}
    </q-banner>

    <div class="q-ma-md">
      <q-input
        data-testid="email-input"
        type="email"
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
        data-testid="password-input"
        :type="passwordVisible ? 'text' : 'password'"
        dense
        rounded
        outlined
        v-model="credentials.password"
        label="Password"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-key" />
        </template>
        <template v-slot:append>
          <q-icon
            data-testid="eye-icon"
            :name="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            class="cursor-pointer"
            @click="togglePasswordVisibility"
          />
        </template>
      </q-input>
    </div>
    <div class="q-ma-md flex buttons">
      <q-btn
        data-testid="sign-in-button"
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
      <google-sign-in-button @google-error="handleGoogleError" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { backend } from 'src/axios'

import { UserWithoutHash } from 'backend/src/users/user-without-hash.dto'
import { AxiosError } from 'axios'
import { useVisibilityToggle } from 'src/composables/use-visibility-toggle'
import { useSaveAndRedirect } from 'src/composables/use-save-and-redirect'

import GoogleSignInButton from './google-sign-in-button.vue'

const { passwordVisible, togglePasswordVisibility } = useVisibilityToggle()
const { saveUserAndRedirect } = useSaveAndRedirect()
const isLoading = ref(false)
const authError = ref('')

const credentials = reactive({
  email: '',
  password: '',
})

const handleGoogleError = (message: string) => {
  authError.value = message
}

const login = async () => {
  isLoading.value = true
  backend
    .post<UserWithoutHash>('/auth/login', credentials)
    .then(saveUserAndRedirect)
    .catch((error: AxiosError) => {
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
