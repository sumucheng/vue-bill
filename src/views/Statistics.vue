<template>
  <Layout>
    <Title :now.sync="now" :headerTitle="headerTitle" />
    <div class="panel">
      <Tabs :selected.sync="selected" :options="options" />
      <Detail v-if="selected==='detail'" :selected.sync="selected" :now="now" />
      <Category v-else :selected.sync="selected" :now="now" :type.sync="type" />
    </div>
  </Layout>
</template>

<script lang="ts">
import common from "../store/common";

import Title from "@/components/common/Title.vue";
import Tabs from "@/components/common/Tabs.vue";
import Category from "./Category.vue";
import Detail from "./Detail.vue";

import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";
import { Route } from "vue-router";
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);

@Component({
  components: { Category, Detail, Title, Tabs }
})
export default class Statistics extends Vue {
  now: Date = new Date();
  selected = "detail";
  type = "expend";
  options = [
    { en: "detail", zh: "流水" },
    { en: "category", zh: "分类" }
  ];
  created() {
    this.$store.commit("fetchBills");
  }
  get oneMonthSum() {
    return this.$store.getters.oneMonthSum(this.now);
  }
  get headerTitle() {
    return common.headerTitle(this.oneMonthSum, this.selected, this.type);
  }
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    if (from.path.match("statistics/")) {
      next((vm: any) => (vm.selected = "category"));
    } else next();
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