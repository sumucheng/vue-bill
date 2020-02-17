<template>
  <div class="monthList">
    <div class="row header">
      <div class="month item">月份</div>
      <div class="item">支出</div>
      <div class="item">收入</div>
      <div class="item">结余</div>
    </div>
    <div class="row" v-for="month in monthSum" :key="month.month">
      <div class="month item">{{monthText(month.month)}}</div>
      <div class="item">{{month.expend}}</div>
      <div class="item">{{month.income}}</div>
      <div class="item">{{month.rest}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/store";
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";
@Component
export default class MonthList extends Vue {
  @Prop({ default: new Date() }) now!: Date;
  get monthSum() {
    return store.monthSum.filter(i => i.year === this.now.getFullYear());
  }
  monthText(month: number) {
    return (month < 9 ? "0" + (month + 1) : month + 1) + "月";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.monthList {
  width: 100vw;
  background-color: $light-grey;
  position: fixed;
  top: 205px;
  bottom: 0;
  .item {
    width: 28%;
    padding-left: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $border-grey;
  }
  .row {
    display: flex;
    background-color: white;
    > .item {
      height: 50px;
      font-size: $font-size-m;
      font-family: $font-number;
      &.month {
        width: 15%;
        font-family: $font-hei;
      }
    }
  }
  .row.header {
    margin-top: 10px;
    > .item {
      height: 35px;
      color: $grey;
      font-size: $font-size-s;
    }
  }
}
</style>