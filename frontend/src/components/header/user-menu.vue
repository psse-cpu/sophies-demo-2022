<template>
  <q-btn-dropdown stretch flat data-testid="me-dropdown">
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-avatar color="light-green-7">
          {{ user?.givenName[0] ?? '' }}
        </q-avatar>
        <div class="text-center q-ml-md" data-testid="my-name">
          {{ user?.givenName }}
        </div>
      </div>
    </template>

    <q-list dense>
      <q-item clickable v-close-popup tabindex="0">
        <q-item-section avatar>
          <q-avatar icon="mdi-account" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Profile</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup tabindex="0">
        <q-item-section avatar>
          <q-avatar icon="mdi-cog" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset spaced />

      <logout-menu-item />
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { currentUser } from 'src/auth'
import { ref } from 'vue'
import LogoutMenuItem from './logout-menu-item.vue'

const user = ref(await currentUser())
</script>
