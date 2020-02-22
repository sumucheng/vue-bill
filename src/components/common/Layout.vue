<template>
  <div class="wrapper">
    <div class="main">
      <slot />
    </div>
    <Nav v-if="hasNav" />
  </div>
</template>

<script lang="ts">
import Title from "@/components/common/Title.vue";
import Nav from "@/components/common/Nav.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Nav, Title }
})
export default class Layout extends Vue {
  @Prop({ default: true }) hasNav!: boolean;
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
    top: 0;
    bottom: 81px;
    background-color: $light-grey;
    width: 100%;
  }
}
</style>