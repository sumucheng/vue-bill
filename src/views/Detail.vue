<template>
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
</template>
 
<script lang="ts">
import BillItem from "@/components/detail/Bill.vue";
import Time from "@/components/detail/Time.vue";
import Sum from "@/components/detail/Sum.vue";
import NoData from "@/components/detail/NoData.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { BillItem, Time, Sum, NoData }
})
export default class Statistics extends Vue {
  @Prop() now!: Date;
  get oneDayBills() {
    return store.oneDayBills(this.now);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

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
</style>