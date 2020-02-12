<template>
  <div class="date">
    <div class="monthAndDay">{{displayText}}</div>
    <div class="week">{{weekText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() time!: { day: number; week: number; month: number; year: number };
  oneWeek = ["日", "一", "二", "三", "四", "五", "六"];
  dateText = this.time.day < 10 ? "0" + this.time.day : this.time.day;
  monthText =
    this.time.month < 9 ? "0" + (this.time.month + 1) : this.time.month + 1;
  weekText = `星期${this.oneWeek[this.time.week]}`;
  displayText = `${this.monthText}/${this.dateText}`;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.date {
  display: flex;
  align-items: flex-end;
  > .monthAndDay {
    font-size: $font-size-xl;
    margin-right: 5px;
    color: $black;
  }
  > .week {
    line-height: 1.8em;
  }
}
</style>