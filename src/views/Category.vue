<template>
  <div class="category">
    <SwitchType :text="switchText" :selected.sync="syncedType" />
    <Chart :oneDayBills="oneDayBills" :type="type" />
    <List :oneTagBills="oneTagBills" :expendAndIncome="oneMonthSum" :type="type" :now="now" />
  </div>
</template>
 
<script lang="ts">
import store from "../store/store";

import Chart from "@/components/category/Chart.vue";
import List from "@/components/category/List.vue";
import SwitchType from "@/components/category/SwitchType.vue";

import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";
@Component({
  components: { Chart, List, SwitchType }
})
export default class Statistics extends Vue {
  @Prop() now!: Date;
  @PropSync("type", { type: String }) syncedType!: string;
  switchText = [
    { en: "income", zh: "收" },
    { en: "expend", zh: "支" }
  ];
  get oneTagBills() {
    return store.OneTagBills(this.now);
  }
  get oneDayBills() {
    return store.oneDayBills(this.now);
  }
  get oneMonthSum() {
    return store.monthSum.find(
      i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
    );
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
  position: relative;
}
</style>