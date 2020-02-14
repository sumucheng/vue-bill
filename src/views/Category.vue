<template>
  <Layout>
    <Title :now.sync="now" :headerTitle="headerTitle" />
    <div class="panel">
      <Tabs :initSelected="selectedTitle" />
      <div class="category">
        <SwitchType :text="switchText" :selected.sync="type" />
        <Chart :oneDayBills="oneDayBills" :type="type" />
        <List :oneTagBills="oneTagBills" :expendAndIncome="oneMonthSum" :type="type" :now="now" />
      </div>
    </div>
  </Layout>
</template>
 
<script lang="ts">
import Title from "@/components/layout/Title.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Chart from "@/components/category/Chart.vue";
import List from "@/components/category/List.vue";
import NoData from "@/components/statistics/NoData.vue";
import SwitchType from "@/components/category/SwitchType.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { Title, Tabs, Chart, List, NoData, SwitchType }
})
export default class Statistics extends Vue {
  type = "expend";
  switchText = [
    { en: "income", zh: "收" },
    { en: "expend", zh: "支" }
  ];
  now = new Date();
  oneTagBills: oneTagBills[] | undefined;
  oneDayBills: oneDayBills[] | undefined;
  oneMonthSum: MonthSum | undefined;
  headerTitle: { text: string; count: number | string }[] = [];
  selectedTitle = "category";

  created() {
    this.update();
  }
  update() {
    this.oneMonthSum = store.monthSum.find(
      i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
    );
    this.headerTitle = this.text();
    this.oneTagBills = store.OneTagBills(this.now);
    this.oneDayBills = store.oneDayBills(this.now);
  }

  text() {
    const averageText =
      this.type === "expend" ? "平均每日支出" : "平均每日收入";
    if (this.oneMonthSum) {
      const average =
        this.type === "expend"
          ? this.oneMonthSum!.averageExpend
          : this.oneMonthSum!.averageIncome;
      return [
        { text: "结余", count: this.oneMonthSum!.rest },
        { text: averageText, count: average }
      ];
    } else {
      return [
        { text: "结余", count: 0 },
        { text: averageText, count: 0 }
      ];
    }
  }
  @Watch("now")
  onNowChanged() {
    this.update();
  }
  @Watch("type")
  onTypeChanged() {
    this.update();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  bottom: 80px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .category {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    padding-bottom: 40px;
    position: relative;
  }
}
</style>