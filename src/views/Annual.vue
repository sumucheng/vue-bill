<template>
  <div>
    <img src="@/assets/background.png" class="background" />
    <Back titleText="年账单" color="white" />
    <div class="annual">
      <div class="header">
        <Year :now.sync="now" />
        <Title :headerTitle="headerTitle" />
      </div>
      <MonthList :now="now" />
    </div>
  </div>
</template>

<script lang="ts">
import Back from "@/components/common/Back.vue";
import Year from "@/components/annual/Year.vue";
import Title from "@/components/annual/Title.vue";
import MonthList from "@/components/annual/MonthList.vue";
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: { Back, MonthList, Title, Year }
})
export default class Annual extends Vue {
  now = new Date();
  get headerTitle() {
    let yearData = {
      expend: 0,
      income: 0,
      rest: 0
    };
    const monthSum = this.$store.getters.getMonthSumByYear(this.now);
    for (let i of monthSum) {
      yearData.expend += i.expend;
      yearData.income += i.income;
      yearData.rest += i.rest;
    }
    return [
      { text: "支出", count: yearData.expend },
      { text: "收入", count: yearData.income },
      { text: "结余", count: yearData.rest }
    ];
  }
  created() {
    this.$store.commit("fetch");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 205px;
}
.annual {
  position: fixed;
  top: 98px;
  bottom: 0;
  width: 100%;
  .link {
    position: fixed;
    top: 55px;
    left: 10px;
    z-index: 10;
    .icon {
      height: 12px;
    }
  }
  .header {
    color: white;
  }
}
</style>