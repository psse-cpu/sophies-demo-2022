<template>
  <q-item
    data-testid="logout-menu-item"
    clickable
    v-close-popup
    tabindex="0"
    @click="logout"
  >
    <q-item-section avatar>
      <q-avatar icon="mdi-logout" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Logout</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import localforage from 'localforage'
import { backend } from 'src/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = async () => {
  await localforage.removeItem('currentUser')
  await backend.post('/auth/logout')
  router.push('/guest/login')
}
</script>
