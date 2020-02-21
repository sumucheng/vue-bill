<template>
  <div id="chart"></div>
</template>

<script lang="ts">
import G2 from "@antv/g2";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() billsGroupByDay!: BillsGroupByDay;
  @Prop() type!: "expend" | "income";
  chart: G2.Chart | undefined;
  get chartData() {
    const chartData: { date: number; value: number }[] = [];
    for (let i = 1; i < 32; i++) {
      chartData.push({ date: i, value: 0 });
    }
    for (let i of Object.values(this.billsGroupByDay)) {
      chartData[i.date.day - 1] = {
        date: i.date.day,
        value: i.sum[this.type]
      };
    }
    return chartData;
  }
  @Watch("chartData")
  onChartDataChange() {
    this.chart && this.chart.changeData(this.chartData);
  }
  mounted() {
    this.chart = new G2.Chart({
      container: "chart",
      forceFit: true,
      height: 150,
      padding: [20, 20, 30, 20],
      animate: false
    });
    this.chart.source(this.chartData);
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