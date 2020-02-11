<template>
  <div class="category">
    <div id="chart"></div>
    <div class="labels">
      <div class="list">支出排行榜</div>
      <div class="oneLabel" v-for="item in displayBills" :key="item.label+item.sum">
        <div class="left">
          <div class="label">{{item.label}}</div>
          <div class="percent">{{percent(item.sum)+'%'}}</div>
        </div>
        <div class="right">{{item.sum}}</div>
      </div>
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
interface DisplayBills {
  date: { day: number; week: number; month: number; year: number };
  sum: { expend: number; income: number };
  data: Bill[];
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
  @Prop() oneDayBills!: DisplayBills[];
  @Prop() expendAndIncome!: { expend: number; income: number };
  type = "expend";
  displayBills = this.sortedBills.filter(el => el.type === this.type);
  chart: G2.Chart | undefined;

  @Watch("type")
  onTypeChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
  }
  @Watch("sortedBills")
  onSortedBillsChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
    const chartData: { date: number; value: number }[] = [];

    for (let i = 1; i < 32; i++) {
      chartData.push({ date: i, value: 0 });
    }
    for (let i of this.oneDayBills) {
      chartData[i.date.day - 1] = {
        date: i.date.day,
        value: this.type === "expend" ? i.sum.expend : i.sum.income
      };
    }
    this.chart && this.chart.changeData(chartData);
  }

  percent(n: number) {
    const x =
      this.type === "expend"
        ? this.expendAndIncome.expend
        : this.expendAndIncome.income;
    return ((100 * n) / x).toFixed(2);
  }

  mounted() {
    const chartData: { date: number; value: number }[] = [];

    for (let i = 1; i < 32; i++) {
      chartData.push({ date: i, value: 0 });
    }
    for (let i of this.oneDayBills) {
      chartData[i.date.day - 1] = {
        date: i.date.day,
        value: this.type === "expend" ? i.sum.expend : i.sum.income
      };
    }
    this.chart = new G2.Chart({
      container: "chart",
      forceFit: true,
      height: 150,
      padding: [20, 20, 30, 20],
      animate: false
    });
    this.chart.source(chartData);
    this.chart.scale("value", {
      min: 0
    });
    this.chart.scale("date", {
      ticks: [1, 5, 10, 15, 20, 25, 30]
    });
    this.chart
      .line()
      .size(0.8)
      .position("date*value")
      .color("#FF8C06");
    this.chart
      .point()
      .position("date*value")
      .size(2)
      .shape("circle")
      .color("#FF8C06")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });
    this.chart.axis("value", false);
    this.chart.axis("date", {
      tickLine: null,
      line: {
        stroke: "#eee",
        lineWidth: 0.8
      },
      label: {
        textStyle: {
          fill: "#999",
          fontSize: 11
        }
      }
    });
    this.chart.legend(false);
    this.chart.tooltip(false);
    this.chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.category {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding-bottom: 40px;
  #chart {
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  .circle {
    position: absolute;
    top: 20px;
    align-self: center;
    height: 140px;
    width: 140px;
    border-radius: 50%;
    border: 15px solid $grey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .labels {
    max-height: 90%;
    overflow: auto;
    .list {
      padding-left: 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
    }
    .oneLabel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      margin: 0 20px;
      height: 60px;
      background-color: $light-grey;
      margin-bottom: 10px;
      border-radius: $border-radius-m;
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