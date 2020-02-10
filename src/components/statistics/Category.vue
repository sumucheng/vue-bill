<template>
  <div class="category">
    <div class="circle" @click="changeType">
      <div class="sum">{{type==='expend'?expendAndIncome.expend:expendAndIncome.income}}</div>
      <div class="text">{{type==='expend'?'总支出':'总收入'}}</div>
    </div>
    <div class="labels">
      <div class="oneLabel" v-for="item in displayBills" :key="item.label+item.sum">
        <div class="left">
          <div class="label">{{item.label}}</div>
          <div class="percent">{{percent(item.sum)}}</div>
        </div>

        <div class="right">{{item.sum}}</div>
      </div>
    </div>
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
interface SortedBills {
  type: string;
  label: string;
  sum: number;
  data: Bill[];
}
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() sortedBills!: SortedBills[];
  @Prop() expendAndIncome!: { expend: number; income: number };
  type = "expend";
  @Watch("type")
  onTypeChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
  }
  displayBills = this.sortedBills.filter(el => el.type === this.type);
  changeType() {
    this.type = this.type === "expend" ? "income" : "expend";
  }
  percent(n: number) {
    const x =
      this.type === "expend"
        ? this.expendAndIncome.expend
        : this.expendAndIncome.income;
    return ((100 * n) / x).toFixed(2).toString() + "%";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.category {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  .circle {
    margin-top: 20px;
    align-self: center;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 15px solid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .labels {
    max-height: 100%;
    overflow: auto;
    .oneLabel {
      display: flex;
      justify-content: space-between;
      padding-left: 25px;
      padding-right: 20px;
      margin: 0 20px;
      height: 70px;
      background-color: $light-grey;
      margin-bottom: 10px;
      border-radius: $border-radius-m;
      align-items: center;
      .left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .label {
          font-size: $font-size-m;
          line-height: 1.5em;
        }
        .percent {
          color: $grey;
          font-size: $font-size-s;
        }
      }
      .right {
        font-family: $font-number;
        font-size: $font-size-l;
        text-align: right;
        font-weight: bold;
      }
    }
  }
}
</style>