<template>
  <div class="sum">{{displayText}}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop(String) type: string | undefined;
  @Prop() sum!: { expend: number; income: number };
  displayType = this.type === "expend" ? "支出" : "收入";
  result = this.type === "expend" ? this.sum.expend : this.sum.income;
  displayText = `${this.displayType}:${this.result}`;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

</style>