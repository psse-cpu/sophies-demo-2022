<template>
  <q-page class="row">
    <div class="col q-pa-md">
      <q-carousel
        class="bg-primary text-white shadow-1 rounded-borders"
        style="height: 90% !important"
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide
          name="jira"
          class="bg-yellow-9 column no-wrap flex-center ad"
        >
          <div class="row">
            <q-icon name="mdi-jira" size="256px" />
            <q-icon name="mdi-head-lightbulb" size="256px" />
          </div>

          <div class="q-mt-md text-center">
            Opinionated Jira for Agile and Scrum newbies
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="fake"
          class="bg-red-10 column no-wrap flex-center ad"
        >
          <div class="row">
            <q-icon name="mdi-cancel" size="256px" />
            <q-icon name="mdi-ninja" size="256px" />
          </div>

          <div class="q-mt-md text-center">
            You won't be just another fake Agile team that uses buzzwords
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="coach"
          class="bg-indigo-10 column no-wrap flex-center ad"
        >
          <div class="row">
            <q-icon name="mdi-human-male-board" size="256px" />
            <q-icon name="mdi-thumb-up" size="256px" />
          </div>

          <div class="q-mt-md text-center">
            An Agile coach to hold your hand until you learn how to walk on your
            own
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="engineering"
          class="bg-green-9 column no-wrap flex-center ad"
        >
          <div class="row">
            <q-icon name="mdi-calendar-check" size="256px" />
            <q-icon name="mdi-ski-cross-country" size="256px" />
          </div>

          <div class="q-mt-md text-center">
            We'll make sure your team's process is of high-quality, according to
            software engineering best practices.
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="col"></div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    return {
      slide: ref(1),
    }
  },
}
</script>

<style scoped>
.ad {
  font-size: 2em;
}
</style>
