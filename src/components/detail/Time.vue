<template>
  <div class="date">
    <div class="monthAndDay">{{d.text}}</div>
    <div class="week">{{d.weekText}}</div>
  </div>
</template>

<script lang="ts">
import BillCommon from "@/mixins/BillCommon";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
@Component
export default class BillList extends mixins(BillCommon) {
  @Prop() time!: { day: number; week: number; month: number; year: number };
  d = this.displayDate(this.time);
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