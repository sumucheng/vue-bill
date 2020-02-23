<template>
  <HeaderLayout :titleText="tagName">
    <div class="bills">
      <div class="yearAndMonth">{{yearAndMonth}}</div>
      <BillItem v-for="bill in bills" :key="bill.time" :bill="bill" />
      <div class="line"></div>
    </div>
  </HeaderLayout>
</template>

<script lang="ts">
import dayjs from "dayjs";
import BillItem from "@/components/category/Bill.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { BillItem }
})
export default class TagStatistics extends Vue {
  get tagName() {
    return this.$route.params.id.split("-")[0];
  }
  get date() {
    return new Date(Number(this.$route.params.id.split("-")[1]));
  }
  get yearAndMonth() {
    return dayjs(this.date).format("YYYY-M");
  }
  get bills() {
    return (
      this.$store.getters.getBillsByTag(this.date)[this.tagName].data || []
    );
  }
  created() {
    this.$store.commit("fetch");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.bills {
  background-color: white;
  height: 100%;
  .yearAndMonth {
    font-size: $font-size-m;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 25px;
    font-family: $font-number;
  }
}
</style>