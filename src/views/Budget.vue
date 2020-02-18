<template>
  <div class="budget">
    <Back titleText="本月预算" />
    <div class="main">
      <div class="line"></div>
      <div class="rest">
        <div class="text">剩余预算</div>
        <div class="count">{{budget.rest}}</div>
      </div>
      <div class="row">
        <div class="item">
          <div class="text">总预算</div>
          <div class="count">{{budget.sum}}</div>
        </div>
        <div class="item">
          <div class="text">本月支出</div>
          <div class="count">{{expend}}</div>
        </div>
        <div class="item">
          <div class="text">剩余每日可用</div>
          <div class="count">{{budget.dailyCanUse}}</div>
        </div>
      </div>

      <router-link to="/settingBudget" class="button">
        <Button text="设置每月预算" type="primary" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/store";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Back }
})
export default class Budget extends Vue {
  budget = store.budget;
  now = new Date();
  monthSum = store.monthSum.find(
    i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
  );
  expend = this.monthSum ? this.monthSum.expend : 0;
  settingBudget() {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.budget {
  .main {
    position: fixed;
    top: 88px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .button {
      margin: 20px;
    }
    .rest {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      .text {
        font-size: $font-size-m;
        color: $grey;
        margin-bottom: 4px;
      }
      .count {
        font-size: $font-size-l;
        font-family: $font-number;
      }
    }
    .row {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .item {
        width: 33%;
        padding-left: 20px;
        border-right: 1px dotted $light-orange;
        &:last-child {
          border: none;
        }
        .text {
          color: $grey;
          display: flex;
          margin-bottom: 4px;
        }
        .count {
          font-family: $font-number;
          font-size: $font-size-m;
          display: flex;
        }
      }
    }

    .line {
      height: 10px;
      width: 100vw;
      background-color: $border-grey;
    }
  }
}
</style>