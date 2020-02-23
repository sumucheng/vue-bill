<template>
  <div class="monthList">
    <div class="row header">
      <div class="month item">月份</div>
      <div class="item">支出</div>
      <div class="item">收入</div>
      <div class="item">结余</div>
    </div>
    <div class="row" v-for="month in msList" :key="month.date.toString()">
      <div class="month item">{{monthText(month.date)}}</div>
      <div class="item sum">{{month.expend}}</div>
      <div class="item sum">{{month.income}}</div>
      <div class="item sum">{{month.rest}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class MonthList extends Vue {
  @Prop() msList!: MonthStats[];
  monthText(date: Date) {
    return dayjs(date).format("M月");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.monthList {
  width: 100vw;
  background-color: $light-grey;
  position: fixed;
  top: 165px;
  bottom: 0;
  overflow: auto;
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
    .item {
      height: 50px;
      &.sum {
        font-size: $font-size-m;
        font-family: $font-number;
      }
      &.month {
        width: 15%;
      }
    }
  }
  .row.header {
    margin-top: 10px;
    .item {
      height: 35px;
      color: $grey;
      font-size: $font-size-s;
    }
  }
}
</style>