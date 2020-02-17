<template>
  <div>
    <img src="@/assets/background.png" class="background" />
    <Back titleText="年账单" color="white" />
    <div class="annual">
      <div class="header">
        <div class="year">
          <div class="line"></div>
          <Icon name="solid-left" class="left" @click.native="preMonth" />
          {{year}}年
          <Icon name="solid-right" class="right" @click.native="nextMonth" />
          <div class="line"></div>
        </div>
        <div class="title">
          <div class="item" v-for="title in headerTitle" :key="title.text">
            <div class="text">{{title.text}}</div>
            <div class="sum">{{title.count}}</div>
          </div>
        </div>
      </div>
      <div class="monthList">
        <div class="listTitle">
          <div class="month item">月份</div>
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
  headerTitle: { text: string; count: number }[] = [];
  created() {
    for (let month of this.monthSum) {
      this.yearData.expend += month.expend;
      this.yearData.income += month.income;
      this.yearData.rest += month.rest;
    }
    this.headerTitle = [
      { text: "支出", count: this.yearData.expend },
      { text: "收入", count: this.yearData.income },
      { text: "结余", count: this.yearData.rest }
    ];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 205px;
}
.annual {
  position: fixed;
  top: 98px;
  bottom: 0;
  width: 100%;
  .link {
    position: fixed;
    top: 55px;
    left: 10px;
    z-index: 10;
    .icon {
      height: 12px;
    }
  }
  .header {
    color: white;
    .year {
      font-size: $font-size-l;
      display: flex;
      justify-content: center;
      align-items: center;
      .line {
        width: 130px;
        border-bottom: 1px dotted rgba($color: white, $alpha: 0.6);
      }
      .icon {
        height: 14px;
        margin: 0 4px;
      }
    }
    .title {
      margin-top: 20px;
      display: flex;
      height: 100px;
      .item {
        width: 33%;
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        .text {
          display: flex;
        }
        .sum {
          margin-top: 6px;
          font-size: $font-size-l;
          font-family: $font-number;
          display: flex;
        }
      }
    }
  }

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
    .listTitle {
      margin-top: 10px;
      background-color: white;
      display: flex;
      > .item {
        height: 35px;
        color: $grey;
        &.month {
          font-family: $font-hei;
          width: 15%;
        }
      }
    }
    .content {
      display: flex;
      background-color: white;
      > .item {
        height: 50px;
        font-size: $font-size-m;
        font-family: $font-number;
        &.month {
          font-family: $font-hei;
          width: 15%;
        }
      }
    }
  }
}
</style>