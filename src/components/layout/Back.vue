<template>
  <div class="back">
    <div class="link" @click="back">
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
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.back {
  padding-top: 44px;
  height: 88px;
  z-index: 10;
  position: fixed;
  background-color: white;
  .link {
    position: fixed;
    top: 44px;
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
    width: 100vw;
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
</style>