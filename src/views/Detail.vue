<template>
  <div>
    <Title :now.sync="now" :headerTitle="headerTitle" />
    <div class="panel">
      <Tabs :selected.sync="selectedTitle" />
      <div class="billList">
        <NoData v-if="oneDayBills.length===0" />
        <div v-else>
          <div v-for="bills in oneDayBills" :key="bills.data[0].time" class="oneDay">
            <div class="timeAndSum">
              <Time :time="bills.date" />
              <Sum :sum="bills.sum" />
            </div>
            <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import BillItem from "@/components/statistics/Bill.vue";
import Time from "@/components/statistics/Time.vue";
import Sum from "@/components/statistics/Sum.vue";
import Title from "@/components/layout/Title.vue";
import NoData from "@/components/statistics/NoData.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { BillItem, Time, Sum, Title, NoData, Tabs }
})
export default class Statistics extends Vue {
  billList = store.bills;
  monthSum = store.monthSum;
  type = "expend";

  headerTitle: { text: string; count: number | string }[] = [];
  @Prop() initNow!: Date;
  now = this.initNow;
  oneDayBills = store.oneDayBills(this.now);
  @Prop() initSelected: string | undefined;
  selectedTitle = this.initSelected;
  @Watch("selectedTitle")
  onSelectedTitleChanged() {
    this.$emit("update:initSelected", this.selectedTitle);
  }
  created() {
    this.headerTitle = this.sum(this.now);
  }

  sum(now: Date) {
    for (let i of this.monthSum) {
      if (i.year === now.getFullYear() && i.month === now.getMonth()) {
        return [
          { text: "支出", count: i.expend },
          { text: "收入", count: i.income }
        ];
        break;
      }
    }
    return [
      { text: "支出", count: 0 },
      { text: "收入", count: 0 }
    ];
  }

  @Watch("now")
  onNowChanged() {
    this.headerTitle = this.sum(this.now);
    this.oneDayBills = store.oneDayBills(this.now);
    this.$emit("update:initNow", this.now);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  bottom: 80px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .billList {
    max-height: 100%;
    overflow: auto;
    .oneDay {
      margin-top: 10px;
      &:last-child {
        padding-bottom: 40px;
      }
      .timeAndSum {
        margin: 5px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: $grey;
        font-size: $font-size-s;
      }
    }
  }
}
</style>