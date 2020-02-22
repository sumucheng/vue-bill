<template>
  <div>
    <Background />
    <Back titleText="年账单" color="white" />
    <div class="annual">
      <div class="header">
        <Year :now.sync="now" />
        <Title :headerTitle="headerTitle" />
      </div>
      <MonthList :msList="msList" />
    </div>
  </div>
</template>

<script lang="ts">
import Back from "@/components/common/Back.vue";
import Year from "@/components/annual/Year.vue";
import Title from "@/components/annual/Title.vue";
import MonthList from "@/components/annual/MonthList.vue";
import Background from "@/components/common/Background.vue";

import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: { Back, MonthList, Title, Year, Background }
})
export default class Annual extends Vue {
  now = new Date();
  get yearStats() {
    return this.$store.getters.getYearStats(this.now);
  }
  get msList() {
    return this.yearStats.msList;
  }
  get headerTitle() {
    const yearData = this.yearStats.yearData;
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