<template>
  <div class="title">
    <div class="item" v-for="title in headerTitle" :key="title.text">
      <div class="text">{{title.text}}</div>
      <div class="sum">{{title.count}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";
@Component
export default class Title extends Vue {
  @Prop() headerTitle: { text: String; count: number }[] | undefined;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.title {
  margin-top: 20px;
  display: flex;
  height: 100px;
  .item {
    width: 33%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    .text {
      display: flex;
    }
    .sum {
      margin-top: 6px;
      font-size: $font-size-l;
      font-family: $font-number;
      display: flex;
    }
  }
}
</style>