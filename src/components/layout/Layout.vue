<template>
  <div class="wrapper">
    <Header :type.sync="tempType" />
    <div class="main">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Header from "@/components/layout/Header.vue";
import Nav from "@/components/layout/Nav.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Header, Nav }
})
export default class Layout extends Vue {
  @Prop(String) type: string | undefined;
  tempType = this.type;
  @Watch("tempType")
  onTempTypeChanged(value: string) {
    this.$emit("update:type", value);
  }
}
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
    top: 114px;
    bottom: 81px;
    background-color: white;
    width: 100%;
    border-radius: $border-radius-l;
  }
}
</style>