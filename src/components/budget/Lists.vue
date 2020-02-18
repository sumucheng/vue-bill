<template>
  <div class="row">
    <div class="item" v-for="list in lists" :key="list.text">
      <div class="text">{{list.text}}</div>
      <div class="count">{{list.count}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Lists extends Vue {
  @Prop({ default: [] }) lists!: { text: string; count: number }[];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.row {
  margin-top: 20px;
  display: flex;
  align-items: center;
  .item {
    width: 33%;
    padding-left: 20px;
    border-right: 1px dotted $light-orange;
    &:last-child {
      border: none;
    }
    .text {
      color: $grey;
      display: flex;
      margin-bottom: 4px;
    }
    .count {
      font-family: $font-number;
      font-size: $font-size-m;
      display: flex;
    }
  }
}
</style>