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
import store from "../store/store";

import Title from "@/components/layout/Title.vue";
import Tabs from "@/components/statistics/Tabs.vue";
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
  now = new Date();
  selected = "detail";
  type = "expend";
  get oneMonthSum() {
    return store.oneMonthSum(this.now);
  }
  get headerTitle() {
    return store.headerTitle(this.oneMonthSum, this.selected, this.type);
  }
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    if (from.path.match("statistics/")) {
      next((vm: any) => {
        vm.selected = "category";
      });
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