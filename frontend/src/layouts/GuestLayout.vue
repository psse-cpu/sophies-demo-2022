<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated glossy>
      <q-toolbar class="bg-blue-grey-8 q-pa-xs q-pt-sm">
        <q-toolbar-title class="branding">
          <img
            src="../assets/logo.png"
            style="vertical-align: middle"
            height="32"
          />
          <h5>ShipThat</h5>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        Copyright Philippine Society of Software Engineers 2022
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss">
.branding {
  font-family: 'BioRhyme', serif;
  font-weight: 700;
  color: $blue-grey-1;
  padding: 4px;
  padding-top: 2px;

  h5 {
    margin-left: 8px;
    display: inline;
    vertical-align: middle;
  }
}
</style>
