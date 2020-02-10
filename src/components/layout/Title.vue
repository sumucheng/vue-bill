<template>
  <div>
    <img src="@/assets/background.png" class="background" />
    <div class="title">
      <div class="wrapper yearAndMonth">
        <div class="year text">{{year}}年</div>
        <div class="month">
          <Icon name="solid-left" class="left" @click.native="lastMonth" />
          {{monthText}}月
          <Icon name="solid-right" class="right" @click.native="nextMonth" />
        </div>
      </div>
      <div class="dotLine"></div>
      <div class="wrapper">
        <div class="text">支出</div>
        <div class="sum">{{expendAndIncome.expend}}</div>
      </div>
      <div class="wrapper">
        <div class="text">收入</div>
        <div class="sum">{{expendAndIncome.income}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type MonthSum = {
  year: number;
  month: number;
  expend: number;
  income: number;
};
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() now!: Date;
  @Prop() expendAndIncome!: { expend: number; income: number };
  year = this.now.getFullYear();
  month = this.now.getMonth();
  monthText = this.month < 9 ? "0" + (this.month + 1) : this.month + 1;
  lastMonth() {
    this.$emit("update:now", new Date(this.now.setMonth(this.month - 1)));
  }
  nextMonth() {
    this.$emit("update:now", new Date(this.now.setMonth(this.month + 1)));
  }
  @Watch("now")
  onNowChanged() {
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.monthText = this.month < 9 ? "0" + (this.month + 1) : this.month + 1;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.title {
  position: absolute;
  display: flex;
  width: 100%;
  height: 80px;
  margin-top: 44px;
  margin-bottom: 20px;
  color: white;
  .wrapper {
    width: 33%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .text {
      font-size: $font-size-s;
      opacity: 0.7;
      margin-bottom: 8px;
    }
    .sum,
    .month {
      font-size: $font-size-l;
      height: 26px;
      display: flex;
      align-items: flex-end;
    }
    .month {
      position: relative;
      .icon {
        height: 12px;
        width: 12px;
        position: absolute;
        &.left {
          left: -15px;
          bottom: 4px;
        }
        &.right {
          right: -15px;
          bottom: 4px;
        }
      }
    }
  }
  .yearAndMonth {
    width: 25%;
  }
  .dotLine {
    margin-top: 4px;
    height: 45px;
    border-right: 1px dotted rgba($color: white, $alpha: 0.6);
  }
}
</style>