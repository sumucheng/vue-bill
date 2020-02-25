<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/normal.scss";
#app {
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  font-size: $font-size-s;
}
@media (min-width: 500px) {
  body {
    #app {
      box-shadow: 0 4px 8px 0 rgba(9, 17, 71, 0.3);
      width: 500px;
    }
  }
}
</style>
