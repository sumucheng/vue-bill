<template>
  <router-link to="/annualBill">
    <div class="total">
      <div class="top">
        <div class="title">账单</div>
        <Icon name="right" />
      </div>
      <div class="content">
        <div class="item month">{{monthText}}</div>
        <div class="dotLine"></div>
        <div class="item" v-for="title in headerTitle" :key="title.text">
          <div class="text">{{title.text}}</div>
          <div class="sum">{{title.count}}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component
export default class Into extends Vue {
  now = new Date();
  monthStats = this.$store.getters.getMonthStats(this.now);
  headerTitle = [
    { text: "支出", count: this.monthStats.expend || 0 },
    { text: "收入", count: this.monthStats.income || 0 },
    { text: "结余", count: this.monthStats.rest || 0 }
  ];
  monthText = dayjs(this.monthStats.date).format("MM月");
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.total {
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
  background-color: white;
  border-radius: $border-radius-s;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-size: $font-size-m;
    }
  }

  .content {
    display: flex;
    .dotLine {
      margin-top: 13px;
      border-right: 1px dotted $grey;
      height: 22px;
    }
    .item {
      width: 26.6%;
      display: flex;
      flex-direction: column;
      padding-left: 18px;
      &.month {
        width: 15%;
        padding-left: 0;
        flex-direction: row;
        font-size: $font-size-l;
        display: flex;
        align-items: flex-end;
      }
      .text {
        display: flex;
        color: $grey;
        margin-bottom: 5px;
      }
      .sum {
        display: flex;
        font-family: $font-number;
        font-size: $font-size-m;
      }
    }
  }
}
</style>