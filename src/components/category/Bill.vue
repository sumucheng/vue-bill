<template>
  <router-link :to="`/bill/${bill.id}`">
    <div class="bill">
      <div class="left">
        <div class="time">{{getDate(bill.time)}}</div>
        <div class="label">{{bill.tag}}</div>
        <div class="note">{{bill.note}}</div>
      </div>
      <div class="count">{{(bill.type==='expend'?'-':'+')+bill.count}}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {
  @Prop() bill: Bill | undefined;
  getDate(time: number) {
    return `${new Date(time).getDate()}日`;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.bill {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 25px;
  padding-right: 20px;
  height: 40px;
  border-top: 1px solid $border-grey;
  color: $dark-grey;
  .left {
    display: flex;
    align-items: center;
    white-space: nowrap;
    max-width: 70%;
    .time {
      padding-right: 5px;
    }
    .label {
      padding-right: 5px;
    }
    .note {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .count {
    font-family: $font-number;
    font-size: $font-size-m;
    text-align: right;
    width: 80px;
  }
}
</style>