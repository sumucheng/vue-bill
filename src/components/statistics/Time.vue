<template>
  <div class="date">{{displayText}}</div>
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
  @Prop() time!: { day: number; week: number; month: number; year: number };
  oneWeek = ["日", "一", "二", "三", "四", "五", "六"];
  dateText =
    this.time.day < 10 ? "0" + this.time.day.toString() : this.time.day;
  monthText =
    this.time.month + 1 < 10
      ? "0" + (this.time.month + 1).toString()
      : this.time.month + 1;
  weekText = this.oneWeek[this.time.week];
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
</style>