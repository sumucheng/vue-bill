<template>
  <div class="budget">
    <Back titleText="本月预算" />
    <div class="main">
      <div class="line"></div>
      <div class="rest">
        <div class="text">剩余预算</div>
        <div class="count">{{rest}}</div>
      </div>
      <div class="percentLine">
        <div class="use" :style="`width: ${expend/budget*100}%`"></div>
        <div class="line" :style="`left: ${now.getDate()/endDate*100}%`">
          <div class="day">{{now.getDate()}}日</div>
        </div>
      </div>
      <div class="date">
        <div class="startDate">{{mm+1}}月1日</div>
        <div class="endDate">{{mm+1}}月{{endDate}}日</div>
      </div>
      <Lists :lists="lists" />
      <router-link to="/settingBudget" class="button">
        <Button text="设置每月预算" type="primary" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import common from "@/store/common";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";
import Lists from "@/components/budget/Lists.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Back, Lists }
})
export default class Budget extends Vue {
  now = new Date();
  yy = this.now.getFullYear();
  mm = this.now.getMonth();
  endDate = common.dayOfMonth(this.yy, this.mm);
  monthSum = this.$store.getters.oneMonthSum(this.now);
  get budget() {
    return this.$store.state.budget;
  }
  get expend() {
    return this.monthSum ? this.monthSum.expend : 0;
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
        ? common.fixTwo((this.budget - this.expend) / this.restDay)
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
        font-size: $font-size-xl;
        font-family: $font-number;
      }
    }
    .percentLine {
      height: 30px;
      margin: 0 20px;
      background-color: $light-yellow;
      position: relative;
      .use {
        height: 30px;
        background-color: $light-orange;
        position: absolute;
        top: 0;
        left: 0;
      }
      .line {
        height: 30px;
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
    .date {
      display: flex;
      justify-content: space-between;
      margin: 5px 20px;
      color: $grey;
      position: relative;
      .nowDate {
        color: $orange;
        position: absolute;
      }
    }
    .line {
      height: 10px;
      width: 100vw;
      background-color: $light-grey;
    }
  }
}
</style>