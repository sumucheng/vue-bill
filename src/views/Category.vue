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
import SwitchType from "@/components/category/SwitchType.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { Title, Tabs, Chart, List, SwitchType }
})
export default class Statistics extends Vue {
  type = "expend";
  switchText = [
    { en: "income", zh: "收" },
    { en: "expend", zh: "支" }
  ];
  now = new Date();
  oneTagBills = store.OneTagBills(this.now);
  oneDayBills = store.oneDayBills(this.now);
  oneMonthSum = store.monthSum.find(
    i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
  );
  headerTitle: { text: string; count: number | string }[] = [];
  selectedTitle = "category";

  created() {
    this.headerTitle = this.text();
  }

  text() {
    const averageText =
      this.type === "expend" ? "平均每日支出" : "平均每日收入";
    const average =
      this.type === "expend"
        ? this.oneMonthSum!.averageExpend
        : this.oneMonthSum!.averageIncome;
    return [
      { text: "结余", count: this.oneMonthSum!.rest },
      { text: averageText, count: average }
    ];
  }
  @Watch("now")
  onNowChanged() {
    this.oneDayBills = store.oneDayBills(this.now);
    this.oneTagBills = store.OneTagBills(this.now);
    this.headerTitle = this.text();
  }
  @Watch("type")
  onTypeChanged() {
    this.headerTitle = this.text();
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