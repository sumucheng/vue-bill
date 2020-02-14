<template>
  <Layout>
    <Title :now.sync="now" :headerTitle="headerTitle" />
    <div class="panel">
      <Tabs :selected.sync="selected" />
      <Detail v-if="selected==='detail'" :selected.sync="selected" :now="now" />
      <Category v-else :selected.sync="selected" :now="now" :type.sync="type" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Title from "@/components/layout/Title.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Category from "./Category.vue";
import Detail from "./Detail.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { Category, Detail, Title, Tabs }
})
export default class Statistics extends Vue {
  now = new Date();
  selected = "detail";
  type = "expend";
  oneMonthSum = store.monthSum.find(
    i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
  );
  @Watch("now")
  onNowChanged() {
    this.updateTitle();
  }

  headerTitle: headerTitle[] = [];
  @Watch("selected")
  onSelectedChanged() {
    this.updateTitle();
  }
  @Watch("type")
  onTypeChanged() {
    this.updateTitle();
  }

  created() {
    this.updateTitle();
  }
  updateTitle() {
    if (this.selected === "detail") {
      this.headerTitle = this.detailTitle();
    } else {
      this.oneMonthSum = store.monthSum.find(
        i =>
          i.year === this.now.getFullYear() && i.month === this.now.getMonth()
      );
      this.headerTitle = this.categoryTitle();
    }
  }
  detailTitle() {
    const e = this.oneMonthSum ? this.oneMonthSum.expend : 0;
    const i = this.oneMonthSum ? this.oneMonthSum.income : 0;
    return [
      { text: "支出", count: e },
      { text: "收入", count: i }
    ];
  }
  categoryTitle() {
    const averageText =
      this.type === "expend" ? "平均每日支出" : "平均每日收入";
    const rest = this.oneMonthSum ? this.oneMonthSum.rest : 0;
    const ave = this.oneMonthSum
      ? this.type === "expend"
        ? this.oneMonthSum.averageExpend
        : this.oneMonthSum.averageIncome
      : 0;
    return [
      { text: "结余", count: rest },
      { text: averageText, count: ave }
    ];
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
}
</style>