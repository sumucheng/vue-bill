<template>
  <img src="@/assets/background.png" class="background" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component
export default class Background extends Vue {}
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
}
@media (min-width: 500px) {
  .background {
    width: 500px;
    min-width: 500px;
  }
}
</style>