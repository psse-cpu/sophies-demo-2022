<template>
  <router-view />
</template>

<script setup lang="ts">
import { createClient, provideClient } from '@urql/vue'

const client = createClient({
  url: `${import.meta.env.VITE_BACKEND_ORIGIN}/graphql`,
})

// TODO: investigate calling this in src/boot (could be the cause of testability issues)
provideClient(client)
</script>
