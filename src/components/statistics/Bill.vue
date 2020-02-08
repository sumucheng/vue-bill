<template>
  <div>
    <div class="date">{{displayText}}</div>
    <div class="bill">
      <div class="left">
        <div class="label">{{bill.tag}}</div>
        <div class="note">{{bill.note}}</div>
      </div>
      <div class="count">{{(bill.type==='expend'?'-':'+')+bill.count}}</div>
    </div>
  </div>
</template>

<script lang="ts">
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() bill: Bill | undefined;
  date = new Date(this.bill!.time);
  oneWeek = ["日", "一", "二", "三", "四", "五", "六"];
  dateText =
    this.date.getDate() < 10
      ? "0" + this.date.getDate().toString()
      : this.date.getDate();
  monthText =
    this.date.getMonth() + 1 < 10
      ? "0" + (this.date.getMonth() + 1).toString()
      : this.date.getMonth() + 1;
  weekText = this.oneWeek[this.date.getDay()];
  displayText = `${this.monthText}月${this.dateText}日 - 星期${this.weekText}`;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.date {
  margin: 5px 20px;
  display: flex;
  align-items: center;
  color: $grey;
  font-size: $font-size-m;
}
.bill {
  display: flex;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 20px;
  margin: 0 20px;
  height: 70px;
  background-color: $light-grey;
  margin-bottom: 10px;
  border-radius: $border-radius-m;
  align-items: center;
  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .label {
      font-size: $font-size-m;
      line-height: 1.5em;
    }
    .note {
      color: $grey;
      font-size: $font-size-s;
    }
  }
  .count {
    font-family: $font-number;
    font-size: $font-size-l;
    text-align: right;
    font-weight: bold;
  }
}
</style>