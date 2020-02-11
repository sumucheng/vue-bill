<template>
  <div class="category">
    <div id="chart"></div>
    <div class="labels">
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
import G2 from "@antv/g2";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() sortedBills!: SortedBills[];
  @Prop() expendAndIncome!: { expend: number; income: number };
  type = "expend";
  displayBills = this.sortedBills.filter(el => el.type === this.type);
  chart: G2.Chart | undefined;
  html = `
    <div>
      <div class='sum' style="font-size: 15px;font-weight: bold;font-family:Consolas">
      ${
        this.type === "expend"
          ? this.expendAndIncome.expend
          : this.expendAndIncome.income
      }
      </div> 
      <div style="font-size: 12px;color:#999">
      ${this.type === "expend" ? "总支出" : "总收入"}
      </div>
    </div>`;

  @Watch("type")
  onTypeChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
  }
  @Watch("sortedBills")
  onSortedBillsChange() {
    this.displayBills = this.sortedBills.filter(el => el.type === this.type);
    const chartData = this.displayBills.map(i => {
      return {
        item: i.label,
        count: i.sum,
        percent: parseInt(this.percent(i.sum))
      };
    });

    this.chart!.changeData(chartData);
  }

  percent(n: number) {
    const x =
      this.type === "expend"
        ? this.expendAndIncome.expend
        : this.expendAndIncome.income;
    return ((100 * n) / x).toFixed(2);
  }

  mounted() {
    const chartData = this.displayBills.map(i => {
      return {
        item: i.label,
        count: i.sum,
        percent: parseInt(this.percent(i.sum))
      };
    });
    this.chart = new G2.Chart({
      container: "chart",
      forceFit: true,
      height: 200,
      padding: [15, 125, 20, 125],
      animate: false
    });
    this.chart.legend(false);
    this.chart.source(chartData, {
      percent: {
        formatter: (val: string) => val + "%"
      }
    });
    this.chart.coord("theta", {
      radius: 1,
      innerRadius: 0.7
    });
    this.chart.tooltip(false);
    this.chart
      .intervalStack()
      .position("percent")
      .color("item")
      .label("percent", {
        formatter: (val: string, item: { point: { item: string } }) => {
          if (parseInt(val) > 10) return item.point.item + " " + val;
        }
      })
      .style({
        lineWidth: 1,
        stroke: "#fff"
      })
      .select(false)
      .active(false);
    this.chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.sum {
  font-family: $font-number;
  font-size: $font-size-l;
  font-weight: bold;
  color: red;
}
.category {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding-bottom: 40px;
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