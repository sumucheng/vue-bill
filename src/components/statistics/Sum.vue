<template>
  <div class="sum">{{displayText}}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() sum!: { expend: number; income: number };
  displayText = `支出：${this.sum.expend} 收入:${this.sum.income}`;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.sum {
  line-height: 1.8em;
}
</style>