<template>
  <HeaderLayout titleText="本月预算">
    <div class="rest">
      <div class="text">剩余预算</div>
      <div class="count">{{rest}}</div>
    </div>
    <ProgressBar :now="now" :expend="expend" :budget="budget" :endDate="endDate" />
    <Lists :lists="lists" />
    <div class="button">
      <router-link to="/settingBudget">
        <Button text="设置每月预算" type="primary" />
      </router-link>
    </div>
  </HeaderLayout>
</template>

<script lang="ts">
import BillCommon from "@/mixins/BillCommon";
import Lists from "@/components/budget/Lists.vue";
import ProgressBar from "@/components/budget/ProgressBar.vue";
import HeaderLayout from "@/components/layout/HeaderLayout.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({
  components: { Lists, HeaderLayout, ProgressBar }
})
export default class Budget extends mixins(BillCommon) {
  now = new Date();
  endDate = this.dayOfMonth(this.now.getFullYear(), this.now.getMonth());
  monthStats = this.$store.getters.getMonthStats(this.now);
  get budget() {
    return this.$store.state.budget;
  }
  get expend() {
    return this.monthStats.expend || 0;
  }
  get rest() {
    return this.budget - this.expend > 0 ? this.budget - this.expend : 0;
  }
  get lists() {
    const dailyCanUse =
      this.budget - this.expend > 0
        ? this.fixTwo(
            (this.budget - this.expend) / (this.endDate - this.now.getDate())
          )
        : 0;
    return [
      { text: "总预算", count: this.budget },
      { text: "本月支出", count: this.expend },
      { text: "剩余每日可用", count: dailyCanUse }
    ];
  }
  created() {
    this.$store.commit("fetch");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.rest {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  .text {
    font-size: $font-size-m;
    color: $grey;
    margin-bottom: 4px;
  }
  .count {
    font-size: $font-size-xl;
    font-family: $font-number;
  }
}
.button {
  margin: 20px;
}
</style>