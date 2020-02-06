<template>
  <Layout :type.sync="type">
    <Tabs />
    <Bill v-for="bill in displayBills" :key="bill.count" :bill="bill" />
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/statistics/Tabs.vue";
import Bill from "@/components/statistics/Bill.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Tabs, Bill }
})
export default class Statistics extends Vue {
  expendBills = this.$store.getters.expendBills;
  incomeBills = this.$store.getters.incomeBills;
  displayBills = this.expendBills;
  type = "expend";
  @Watch("type")
  onTypeChanged(value: string) {
    this.type = value;
    this.displayBills =
      this.type === "expend" ? this.expendBills : this.incomeBills;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
</style>