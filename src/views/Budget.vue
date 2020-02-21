<template>
  <div class="budget">
    <Back titleText="本月预算" />
    <div class="main">
      <div class="line"></div>
      <div class="top">
        <div class="rest">
          <div class="text">剩余预算</div>
          <div class="count">{{rest}}</div>
        </div>
        <div class="percentLine">
          <div class="use" :style="`width: ${expend/budget*100}%;max-width:100%`"></div>
          <div class="line" :style="`left: ${now.getDate()/endDate*100}%`"></div>
        </div>
        <div class="date">
          <div class="startDate">{{mm+1}}月1日</div>
          <div class="endDate">{{endDate}}日</div>
        </div>
        <Icon name="scale" />
      </div>
      <Lists :lists="lists" />
      <router-link to="/settingBudget" class="button">
        <Button text="设置每月预算" type="primary" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import BillCommon from "@/mixins/BillCommon";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";
import Lists from "@/components/budget/Lists.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({
  components: { Button, Back, Lists }
})
export default class Budget extends mixins(BillCommon) {
  now = new Date();
  yy = this.now.getFullYear();
  mm = this.now.getMonth();
  endDate = this.dayOfMonth(this.yy, this.mm);
  monthStats = this.$store.getters.getMonthStats(this.now);
  get budget() {
    return this.$store.state.budget;
  }
  get expend() {
    return this.monthStats.expend || 0;
  }
  get rest() {
    return this.budget - this.expend > 0 ? this.budget - this.expend : 0;
  }
  get restDay() {
    return this.endDate - this.now.getDate();
  }
  get lists() {
    const dailyCanUse =
      this.budget - this.expend > 0
        ? this.fixTwo((this.budget - this.expend) / this.restDay)
        : 0;
    return [
      { text: "总预算", count: this.budget },
      { text: "本月支出", count: this.expend },
      { text: "剩余每日可用", count: dailyCanUse }
    ];
  }
  created() {
    this.$store.commit("fetch");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.budget {
  .main {
    position: fixed;
    z-index: 10;
    top: 88px;
    bottom: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .line {
      height: 10px;
      width: 100vw;
      position: absolute;
      top: 0;
      background-color: $light-grey;
    }
    .top {
      margin-top: 9px;
      background-color: white;
      box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.1);
    }
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
        font-size: $font-size-xl;
        font-family: $font-number;
      }
    }
    .percentLine {
      height: 20px;
      margin: 0 20px;
      background-color: $light-yellow;
      position: relative;
      border-radius: $border-radius-m;
      .use {
        border-radius: $border-radius-m;
        height: 20px;
        background-image: linear-gradient(141deg, #ff8700 0%, #ffce4c 100%);
        position: absolute;
        top: 0;
        left: 0;
      }
      .line {
        height: 20px;
        width: 1px;
        background-color: $orange;
        position: absolute;
        top: 0;
        .day {
          position: absolute;
          top: 35px;
          left: -20px;
          width: 40px;
          color: $orange;
        }
      }
    }
    .icon {
      width: 100%;
      height: 10px;
    }
    .date {
      display: flex;
      justify-content: space-between;
      margin: 5px 20px 0 20px;
      color: $grey;
      position: relative;
      .nowDate {
        color: $orange;
        position: absolute;
      }
    }
  }
}
</style>