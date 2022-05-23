<template>
  <q-card class="column no-wrap flex-center ad">
    <q-card-section>
      <div class="row ad-icons">
        <q-icon
          v-for="icon of props.icons"
          :key="icon"
          :name="icon"
          size="64px"
        />
      </div>

      <div class="q-mt-md text-center">
        <slot></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface AppFeatureCardProps {
  icons: string[]
}

const props = defineProps<AppFeatureCardProps>()
</script>

<style scoped lang="scss">
.ad {
  font-size: 1.5em;
  text-align: center;
}

.ad-icons {
  justify-content: center;
}
</style>
