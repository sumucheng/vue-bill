<template>
  <div class="labels">
    <div class="list">{{type==='expend'?'支出':'收入'}}排行榜</div>
    <div class="oneLabel" v-for="item in displayBills" :key="item.tag+item.sum">
      <router-link :to="`/statistics/${item.tag}-${now.getTime().toString()}`">
        <div class="top">
          <div class="left">
            <div class="label">{{item.tag}}</div>
            <div class="percent">{{percent(item.sum, oneMonthStats[type])}}</div>
          </div>
          <div class="number">{{item.sum}}</div>
        </div>
        <div class="line" :style="`width: ${percent(item.sum, displayBills[0].sum)};min-width:5px`"></div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() billsGroupByTag!: BillsGroupByTag;
  @Prop() oneMonthStats!: MonthStats;
  @Prop() type!: "expend" | "income";
  @Prop() now!: Date;
  get displayBills() {
    let bills = [];
    for (let i of Object.values(this.billsGroupByTag)) {
      if (i.type === this.type) bills.push(i);
    }
    bills.sort((a, b) => b.sum - a.sum);
    return bills;
  }
  percent(a: number, b: number) {
    return ((100 * a) / b).toFixed(2) + "%";
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
    border-bottom: 1px solid $border-grey;
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