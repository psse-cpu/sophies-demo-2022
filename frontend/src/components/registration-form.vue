<template>
  <form
    class="q-pa-md bg-grey-1"
    data-testid="login-form"
    @submit.prevent="handleSubmit"
  >
    <h6 class="q-mt-none q-mb-none">Sign Up</h6>

    <div class="q-ma-md">
      <q-input
        data-testid="email-input"
        type="text"
        dense
        rounded
        outlined
        :error="!!validationErrors.email"
        :error-message="validationErrors.email"
        @blur="validate"
        v-model="user.email"
        label="E-mail"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        data-testid="password-input"
        :type="passwordVisible ? 'text' : 'password'"
        dense
        rounded
        outlined
        :error="!!validationErrors.password"
        :error-message="validationErrors.password"
        @blur="validate"
        v-model="user.password"
        label="Password"
      >
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

    <div class="q-ma-md">
      <q-input
        data-testid="given-name-input"
        type="text"
        dense
        rounded
        outlined
        :error="!!validationErrors.givenName"
        :error-message="validationErrors.givenName"
        @blur="validate"
        v-model="user.givenName"
        label="Given Name"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        data-testid="family-name-input"
        type="text"
        dense
        rounded
        outlined
        :error="!!validationErrors.familyName"
        :error-message="validationErrors.familyName"
        @blur="validate"
        v-model="user.familyName"
        label="Family Name"
      />
    </div>

    <div class="q-ma-md flex buttons">
      <q-btn
        data-testid="sign-in-button"
        :loading="isLoading"
        type="submit"
        icon="mdi-account-plus"
        color="primary"
        size="md"
        unelevated
        rounded
        style="width: 100%"
      >
        Sign-up
      </q-btn>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { validate as validateClass } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { User } from 'backend/src/users/user.entity'

import { useVisibilityToggle } from 'src/composables/use-visibility-toggle'
import { useMutation } from '@urql/vue'
import { Registrant, RegistrationSource } from 'src/generated/graphql'
import { RegisterDocument } from './register.generated'

const { executeMutation } = useMutation(RegisterDocument)

const { passwordVisible, togglePasswordVisibility } = useVisibilityToggle()

const user: Registrant = reactive(
  Object.assign(
    plainToClass(User, {
      email: '',
      familyName: '',
      givenName: '',
      registrationSource: RegistrationSource.LOCAL,
    }),
    { password: '' }
  )
)

let hasSubmitted = false

const isLoading = ref(false)
const validationErrors = ref<Partial<Record<keyof Registrant, string>>>({})

const validate = async () => {
  if (!hasSubmitted) {
    return false
  }

  const result: Partial<Record<keyof Registrant, string>> = {}
  const errors = await validateClass(user)

  errors.forEach((error) => {
    const keys = Object.keys(error.constraints ?? {})

    // first condition makes TS happy
    if (error.constraints && keys[0]) {
      const firstError = error.constraints[keys[0]]
      result[error.property as keyof Registrant] = firstError
    }
  })

  if (!user.password) {
    result.password = 'Password cannot be blank'
  }

  validationErrors.value = result
  return Object.keys(result).length === 0
}

watch(user, validate)

const handleSubmit = async () => {
  hasSubmitted = true
  const valid = await validate()

  if (valid) {
    const { data } = await executeMutation({ registrant: user })
    alert(
      `${data?.newUser.familyName}, ${data?.newUser.givenName} has been created!`
    )
  }
}
</script>
