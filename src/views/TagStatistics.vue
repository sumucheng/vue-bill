<template>
  <div class="tagStatistics">
    <div class="title">
      <div class="link" @click="back">
        <Icon name="left" />返回
      </div>
      <div class="titleText">{{tag.name}}</div>
    </div>
    <div class="line"></div>
    <div class="main">
      <div class="yearAndMonth">{{yearAndMonth}}</div>
      <BillItem v-for="bill in data" :key="bill.time" :bill="bill" />
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/tagStore";
import billsModel from "@/model/billsModel.ts";
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
  sortedBills: SortedBills[] = [];
  created() {
    this.tagName = this.$route.params.id.split("-")[0];
    this.tag = store.findTag(this.tagName);
    if (!this.tag) this.$router.replace("/404");
    this.now = this.$route.params.id.split("-")[1];
    const date = new Date(Number(this.now));
    this.yearAndMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
    this.data = billsModel
      .classify(date)
      .find(i => i.label === this.tagName)!.data;
  }
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tagStatistics {
  .title {
    margin: 0 20px;
    padding-top: 44px;
    height: 88px;
    .link {
      position: fixed;
      top: 44px;
      left: 20px;
      height: 44px;
      font-size: $font-size-m;
      color: $black;
      display: flex;
      align-items: center;
      text-align: center;
      .icon {
        margin-right: 4px;
        height: 12px;
      }
    }
    .titleText {
      font-size: $font-size-l;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .line {
    width: 100vw;
    height: 10px;
    background-color: $light-grey;
  }
  .main {
    position: fixed;
    top: 98px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    .yearAndMonth {
      font-size: $font-size-m;
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 25px;
      font-family: $font-number;
      font-weight: bold;
    }
  }
}
</style>