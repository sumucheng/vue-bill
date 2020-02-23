<template>
  <div class="billList">
    <NoData v-if="Object.keys(billsGroupByDay).length===0" />
    <div v-else>
      <div v-for="bills in billsGroupByDay" :key="bills.data[0].time" class="oneDay">
        <div class="timeAndSum">
          <Time :time="bills.date" />
          <Sum :sum="bills.sum" />
        </div>
        <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import BillItem from "@/components/detail/Bill.vue";
import Time from "@/components/detail/Time.vue";
import Sum from "@/components/detail/Sum.vue";
import NoData from "@/components/detail/NoData.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { BillItem, Time, Sum, NoData }
})
export default class Detail extends Vue {
  @Prop() now!: Date;
  get billsGroupByDay() {
    return this.$store.getters.getBillsByDay(this.now);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.billList {
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow: auto;
  width: 100%;
  .oneDay {
    margin: 10px 0;
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
</style>