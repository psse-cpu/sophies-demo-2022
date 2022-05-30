<template>
  <div id="googleSignIn"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { addGoogleSignInButton } from 'src/auth-strategies/google-auth'
import { backend } from 'src/axios'
import { useSaveAndRedirect } from 'src/composables/use-save-and-redirect'
import { AxiosError } from 'axios'

const { saveUserAndRedirect } = useSaveAndRedirect()
const emit = defineEmits<{
  (event: 'google-error', message: string): void
}>()

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
      .then(({ data }) => saveUserAndRedirect(data))
      .catch((error: AxiosError) => {
        emit(
          'google-error',
          error.response?.status === 401
            ? 'Google sign-in failed.'
            : 'Unexpected error occurred.'
        )
      })
  })
})
</script>
