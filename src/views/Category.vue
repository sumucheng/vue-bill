<template>
  <div class="category">
    <SwitchType :text="switchText" :selected.sync="syncedType" />
    <Chart :billsGroupByDay="billsGroupByDay" :type="type" />
    <List
      :billsGroupByTag="billsGroupByTag"
      :oneMonthStats="oneMonthStats"
      :type="type"
      :now="now"
    />
  </div>
</template>
 
<script lang="ts">
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
  get billsGroupByTag() {
    return this.$store.getters.getBillsByTag(this.now);
  }
  get billsGroupByDay() {
    return this.$store.getters.getBillsByDay(this.now);
  }
  get oneMonthStats() {
    return this.$store.getters.getMonthStats(this.now);
  }
  created() {
    this.$store.commit("fetch");
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