<template>
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
</template>

<script setup lang="ts">
import AppFeatureCard from 'src/components/AppFeatureCard.vue'

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

<style lang="scss" scoped>
.ads {
  gap: 16px;
  padding: 0px 16px 16px;
  color: white;
}
</style>
