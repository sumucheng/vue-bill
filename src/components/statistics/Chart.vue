<template>
  <div id="chart"></div>
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
  percentLine(n: number) {
    const max = this.displayBills[0].sum;
    return ((100 * n) / max).toFixed(2) + "%";
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
#chart {
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

</style>