<template>
  <div class="category">
    <div class="circle"></div>
    {{sortedBills}}
  </div>
</template>

<script lang="ts">
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() sortedBills!: {};
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.circle {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 15px solid;
}
</style>