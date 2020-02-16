<template>
  <div class="annual">
    <Back />
    <div class="year">{{year}}</div>
    <div class="title">
      <div class="expend">支出 {{yearData.expend}}</div>
      <div class="income">收入 {{yearData.income}}</div>
      <div class="rest">结余 {{yearData.rest}}</div>
    </div>
    <div class="monthList">
      <div class="listTitle">
        <div class="item">月份</div>
        <div class="item">支出</div>
        <div class="item">收入</div>
        <div class="item">结余</div>
      </div>
      <div class="content" v-for="month in monthSum" :key="month.month">
        <div class="month item">{{`${month.month+1}月`}}</div>
        <div class="expend item">{{month.expend}}</div>
        <div class="income item">{{month.income}}</div>
        <div class="rest item">{{month.rest}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "../store/store";

import Back from "@/components/layout/Back.vue";

import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: { Back }
})
export default class Annual extends Vue {
  now = new Date();
  year = this.now.getFullYear();
  monthSum = store.monthSum;
  yearData = {
    expend: 0,
    income: 0,
    rest: 0
  };
  created() {
    for (let month of this.monthSum) {
      this.yearData.expend += month.expend;
      this.yearData.income += month.income;
      this.yearData.rest += month.rest;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.annual {
  .year {
    height: 50px;
  }
  .title {
    display: flex;
    height: 100px;
    > * {
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .monthList {
    width: 100vw;
    .item {
      width: 25%;
      padding-left: 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $border-grey;
    }
    .listTitle {
      display: flex;
      > .item {
        height: 20px;
        color: $grey;
      }
    }
    .content {
      display: flex;
      > .item {
        height: 40px;
        font-size: $font-size-m;
      }
    }
  }
}
</style>