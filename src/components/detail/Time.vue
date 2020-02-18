<template>
  <div class="date">
    <div class="monthAndDay">{{monthAndDay}}</div>
    <div class="week">{{d.weekText}}</div>
  </div>
</template>

<script lang="ts">
import common from "@/store/store";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() time!: { day: number; week: number; month: number; year: number };
  d = common.displayDate(this.time);
  monthAndDay = `${this.d.monthText}/${this.d.dateText}`;
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