<template>
  <div class="budget">
    <Back titleText="本月预算" />
    <div class="main">
      <div class="line"></div>
      <div class="rest">
        <div class="text">剩余预算</div>
        <div class="count">{{rest}}</div>
      </div>
      <Lists :lists="lists" />
      <router-link to="/settingBudget" class="button">
        <Button text="设置每月预算" type="primary" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import common from "@/store/common";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";
import Lists from "@/components/budget/Lists.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Back, Lists }
})
export default class Budget extends Vue {
  now = new Date();
  monthSum = this.$store.getters.oneMonthSum(this.now);
  get budget() {
    return this.$store.state.budget;
  }
  get expend() {
    return this.monthSum ? this.monthSum.expend : 0;
  }
  get rest() {
    return this.budget - this.expend > 0 ? this.budget - this.expend : 0;
  }
  get lists() {
    const restDay =
      common.dayOfMonth(this.now.getFullYear(), this.now.getMonth()) -
      this.now.getDate();
    const dailyCanUse =
      this.budget - this.expend > 0
        ? common.fixTwo((this.budget - this.expend) / restDay)
        : 0;
    return [
      { text: "总预算", count: this.budget },
      { text: "本月支出", count: this.expend },
      { text: "剩余每日可用", count: dailyCanUse }
    ];
  }
  created() {
    this.$store.commit("fetchBudget");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.budget {
  .main {
    position: fixed;
    top: 88px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .button {
      margin: 20px;
    }
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
        font-size: $font-size-l;
        font-family: $font-number;
      }
    }
    .line {
      height: 10px;
      width: 100vw;
      background-color: $light-grey;
    }
  }
}
</style>