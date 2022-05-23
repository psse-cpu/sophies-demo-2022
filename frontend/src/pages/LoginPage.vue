<template>
  <q-page class="col q-pa-none">
    <div class="row q-pa-md">
      <div class="col-xs-12 col-md">
        <login-jumbotron />
      </div>
      <div class="bg-blue-grey-1 col-xs-12 col-md q-pa-md row">
        <form class="col-md-8 col-xs-12" @submit.prevent="handleSubmit">
          <h6 class="q-mt-none q-mb-none">Already on ShipThat?</h6>

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
    <div class="row ads">
      <app-feature-card
        v-for="(feature, key) in features"
        :key="key"
        :class="`col-xs-12 col-md bg-${feature.color}`"
        :icons="feature.icons.map((name) => `mdi-${name}`)"
      >
        <span v-html="feature.text"></span>
      </app-feature-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import LoginJumbotron from 'src/components/LoginJumbotron.vue'
import AppFeatureCard from 'src/components/AppFeatureCard.vue'
import { addGoogleSignInButton } from 'src/untyped-js/google-auth'
import { backend } from 'src/axios'
import localforage from 'localforage'

onMounted(() => {
  addGoogleSignInButton()
})

const credentials = reactive({
  email: '',
  password: '',
})

async function handleSubmit() {
  const { data: user } = await backend.post('/auth/login', credentials)
  localforage.setItem('currentUser', user)
}

const features = [
  {
    color: 'red-10',
    icons: ['cancel', 'ninja'],
    text: `
      You won't be just another fake Agile team that uses buzzwords,
      mini-waterfalls, or even an ad-hoc process! 😱
    `,
  },
  {
    color: 'indigo-10',
    icons: ['human-male-board', 'hand-extended'],
    text: `
      An Agile coach to assist your ScrumMaster, to hold your hands until you
      learn how to walk on your own.
    `,
  },
  {
    color: 'amber-8',
    icons: ['head-lightbulb', 'eject'],
    text: `
      When you can walk on your own and need to tailor your team's process,
      feel free to <b>eject</b>, just like <code>create-react-app</code>!
    `,
  },
  {
    color: 'green-9',
    icons: ['calendar-check', 'thumb-up'],
    text: `
      We'll make sure your team's process is of high-quality, according to
      software engineering best practices.
    `,
  },
]
</script>

<style scoped lang="scss">
form {
  margin-left: auto;
  margin-right: auto;
}

#googleSignIn iframe {
  display: none !important;
}

.ads {
  gap: 16px;
  padding: 0px 16px 16px;
  color: white;
}
</style>
