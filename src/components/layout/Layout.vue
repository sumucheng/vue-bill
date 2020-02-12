<template>
  <div class="wrapper">
    <div class="main">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Header from "@/components/layout/Header.vue";
import Title from "@/components/layout/Title.vue";
import Nav from "@/components/layout/Nav.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Header, Nav, Title }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 81px;
    background-color: white;
    width: 100%;
    border-radius: $border-radius-l;
  }
}
</style>