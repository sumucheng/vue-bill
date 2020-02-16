<template>
  <div>
    <div class="back">
      <div class="link" @click="back">
        <Icon :name="`left-${color}`" />
        <div class="text">返回</div>
      </div>
      <div class="titleText">{{titleText}}</div>
    </div>
    <div class="line"></div>
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
  margin: 0 20px;
  padding-top: 44px;
  height: 88px;
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
    }
  }
  .titleText {
    font-size: $font-size-l;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.line {
  width: 100vw;
  height: 10px;
  background-color: $light-grey;
}
</style>