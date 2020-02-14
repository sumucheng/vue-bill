<template>
  <div class="category">
    <SwitchType :text="switchText" :selected.sync="myType" />
    <Chart :oneDayBills="oneDayBills" :type="type" />
    <List :oneTagBills="oneTagBills" :expendAndIncome="oneMonthSum" :type="type" :now="now" />
  </div>
</template>
 
<script lang="ts">
import Chart from "@/components/category/Chart.vue";
import List from "@/components/category/List.vue";
import SwitchType from "@/components/category/SwitchType.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { Chart, List, SwitchType }
})
export default class Statistics extends Vue {
  @Prop() now!: Date;
  @Prop() type!: string;
  myType = this.type;
  switchText = [
    { en: "income", zh: "收" },
    { en: "expend", zh: "支" }
  ];
  oneTagBills = store.OneTagBills(this.now);
  oneDayBills = store.oneDayBills(this.now);
  oneMonthSum = store.monthSum.find(
    i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
  );

  created() {
    this.update();
  }

  @Watch("now")
  onNowChanged() {
    this.update();
  }
  @Watch("myType")
  onTypeChanged() {
    this.update();
    this.$emit("update:type", this.myType);
  }
  update() {
    this.oneTagBills = store.OneTagBills(this.now);
    this.oneDayBills = store.oneDayBills(this.now);
    this.oneMonthSum = store.monthSum.find(
      i => i.year === this.now.getFullYear() && i.month === this.now.getMonth()
    );
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.category {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding-bottom: 40px;
  position: relative;
}
</style>