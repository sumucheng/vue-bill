<template>
  <div>
    <div class="row" v-for="list in lists" :key="list.text">
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
  margin: 20px;
  display: flex;
  justify-content: space-between;
  .text {
    color: $grey;
    display: flex;
  }
  .count {
    font-family: $font-number;
    font-size: $font-size-m;
    display: flex;
  }
}
</style>