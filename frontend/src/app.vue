<template>
  <router-view />
</template>

<script setup lang="ts">
import { dedupExchange, fetchExchange } from '@urql/core'
import { createClient, provideClient } from '@urql/vue'
import { cacheExchange } from '@urql/exchange-graphcache'

const client = createClient({
  url: `${import.meta.env.VITE_BACKEND_ORIGIN}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Project: {
          // it's actually a string, so we deserialize it as a date
          createdAt: (project) => new Date(project.createdAt as string),
        },
      },
    }),
    fetchExchange,
  ],
})

provideClient(client)
</script>
