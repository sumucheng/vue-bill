<template>
  <div class="tabs">
    <div
      class="item"
      v-for="title in titles"
      :key="title"
      :class="{active:selected===title}"
      @click="$emit('update:selected',title)"
    >
      <div class="text">{{title==='category'?'分类':'流水'}}</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {
  titles = ["detail", "category"];
  @Prop() selected!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tabs {
  padding-top: 12px;
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