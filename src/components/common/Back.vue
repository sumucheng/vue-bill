<template>
  <div class="back" :class="opacity">
    <div class="link" @click="$router.back()">
      <Icon :name="`left-${color}`" />
      <div class="text" :class="color">返回</div>
    </div>
    <div class="titleText" :class="color">{{titleText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Back extends Vue {
  @Prop({ default: "" }) titleText!: String;
  @Prop({ default: "orange" }) color!: String;
  @Prop({ default: "" }) opacity!: String;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.back {
  width: 100%;
  height: 44px;
  z-index: 20;
  position: fixed;
  background-color: white;
  &.opacity {
    background-color: rgba($color: white, $alpha: 0);
  }
  .link {
    position: fixed;
    left: 20px;
    height: 44px;
    font-size: $font-size-m;
    color: $orange;
    display: flex;
    align-items: center;
    text-align: center;
    .icon {
      margin-right: 4px;
      height: 12px;
    }
    .text {
      line-height: 2em;
      &.white {
        color: white;
      }
    }
  }
  .titleText {
    width: 100%;
    font-size: $font-size-m;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.white {
      color: white;
    }
  }
}
@media (min-width: 500px) {
  .back {
    width: 500px;
  }
}
</style>