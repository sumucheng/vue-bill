<template>
  <div class="wrapper">
    <Back :titleText="titleText" />
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class NavLayout extends Vue {
  @Prop({ default: "" }) titleText!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.wrapper {
  height: 100vh;
  background: $grey;
  background-color: $light-grey;
  .main {
    background-color: white;
    position: fixed;
    z-index: 10;
    top: 54px;
    bottom: 0;
    width: 100vw;
  }
}
</style>