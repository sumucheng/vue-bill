<template>
  <div class="wrapper">
    <Back :titleText="titleText" :color="color" />
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Back from "@/components/common/Back.vue";
@Component({
  components: { Back }
})
export default class HeaderLayout extends Vue {
  @Prop({ default: "" }) titleText!: String;
  @Prop({ default: "orange" }) color!: String;
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
    width: 100%;
  }
}
@media (min-width: 500px) {
  .wrapper {
    .main {
      width: 500px;
    }
  }
}
</style>