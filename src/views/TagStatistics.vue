<template>
  <HeaderLayout :titleText="tag.name">
    <div class="bills">
      <div class="yearAndMonth">{{yearAndMonth}}</div>
      <BillItem v-for="bill in data" :key="bill.time" :bill="bill" />
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
  tag: Tag | undefined;
  tagName: string | undefined;
  now: string | undefined;
  data: Bill[] | undefined;
  yearAndMonth: string | undefined;
  created() {
    this.tagName = this.$route.params.id.split("-")[0];
    this.tag = this.$store.getters.findTag(this.tagName);
    if (!this.tag) this.$router.replace("/404");
    this.now = this.$route.params.id.split("-")[1];
    const date = new Date(Number(this.now));
    this.yearAndMonth = dayjs(date).format("YYYY-M");
    this.data =
      this.$store.getters.getBillsByTag(date)[this.tagName].data || [];
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