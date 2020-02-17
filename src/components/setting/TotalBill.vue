<template>
  <router-link to="/annualBill">
    <div class="total">
      <div class="top">
        <div class="title">账单</div>
        <Icon name="right" />
      </div>

      <div class="content">
        <div class="item month">{{monthText}}月</div>
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
import store from "@/store/store";
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: {}
})
export default class TotalBill extends Vue {
  now = new Date();
  monthSum = store.monthSum.find(
    i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
  );
  headerTitle = [
    { text: "支出", count: this.monthSum ? this.monthSum.expend : 0 },
    { text: "收入", count: this.monthSum ? this.monthSum.income : 0 },
    { text: "结余", count: this.monthSum ? this.monthSum.rest : 0 }
  ];
  monthText =
    this.now.getMonth() < 9
      ? "0" + (this.now.getMonth() + 1)
      : this.now.getMonth() + 1;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.total {
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
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
      padding-left: 12px;
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