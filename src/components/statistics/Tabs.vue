<template>
  <div class="tabs">
    <div class="item" :class="{active:period==='day'}" @click="$emit('update:period','day')">
      <div class="text">按天</div>
      <div class="line"></div>
    </div>
    <div class="item" :class="{active:period==='week'}" @click="$emit('update:period','week')">
      <div class="text">按周</div>
      <div class="line"></div>
    </div>
    <div class="item" :class="{active:period==='month'}" @click="$emit('update:period','month')">
      <div class="text">按月</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {
  @Prop({ default: "day" }) period!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tabs {
  padding-top: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid $light-grey;
  .item {
    position: relative;
    .text {
      margin-bottom: 8px;
      font-size: $font-size-m;
      padding: 0 3px;
    }
    &.active {
      .text {
        color: $orange;
      }
      .line {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        background-color: $orange;
        height: 3px;
        border-radius: 2px;
      }
    }
  }
}
</style>