<template>
  <div class="labels">
    <div class="list">{{type==='expend'?'支出':'收入'}}排行榜</div>
    <div class="oneLabel" v-for="item in displayBills" :key="item.label+item.sum">
      <div class="top">
        <div class="left">
          <div class="label">{{item.label}}</div>
          <div class="percent">{{percent(item.sum)+'%'}}</div>
        </div>
        <div class="number">{{item.sum}}</div>
      </div>
      <div class="line" :style="`width: ${percentLine(item.sum)}`"></div>
    </div>
  </div>
</template>

<script lang="ts">
interface Bill {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
}

interface SortedBills {
  type: string;
  label: string;
  sum: number;
  data: Bill[];
}
import G2 from "@antv/g2";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() sortedBills!: SortedBills[];
  @Prop() expendAndIncome!: { expend: number; income: number };
  @Prop() type!: string;
  displayBills = this.sortedBills.filter(el => el.type === this.type);

  @Watch("type")
  onTypeChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
  }
  @Watch("sortedBills")
  onSortedBillsChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
  }

  percent(n: number) {
    const x =
      this.type === "expend"
        ? this.expendAndIncome.expend
        : this.expendAndIncome.income;
    return ((100 * n) / x).toFixed(2);
  }
  percentLine(n: number) {
    const max = this.displayBills[0].sum;
    return ((100 * n) / max).toFixed(2) + "%";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.labels {
  max-height: 90%;
  overflow: auto;
  .list {
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
  }
  .oneLabel {
    margin: 0 20px;
    height: 60px;
    border-bottom: 1px solid $light-grey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      .left {
        display: flex;
        align-items: center;
        .label {
          font-size: $font-size-m;
          line-height: 1.5em;
          margin-right: 5px;
        }
        .percent {
          color: $grey;
          font-size: $font-size-s;
        }
      }
      .number {
        font-family: $font-number;
        font-size: $font-size-l;
        text-align: right;
        font-weight: bold;
      }
    }
    .line {
      background-color: $light-orange;
      height: 4px;
      border-radius: 20px;
    }
  }
}
</style>