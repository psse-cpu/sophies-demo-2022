<template>
  <router-view />
</template>

<script setup lang="ts">
import { createClient, provideClient } from '@urql/vue'

const client = createClient({
  url: `${import.meta.env.VITE_BACKEND_ORIGIN}/graphql`,
})

provideClient(client)
</script>
