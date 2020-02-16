<template>
  <div class="tagStatistics">
    <Back :titleText="tag.name" />
    <div class="main">
      <div class="bills">
        <div class="yearAndMonth">{{yearAndMonth}}</div>
        <BillItem v-for="bill in data" :key="bill.time" :bill="bill" />
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/store";
import BillItem from "@/components/category/Bill.vue";
import Back from "@/components/layout/Back.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { BillItem, Back }
})
export default class TagStatistics extends Vue {
  tag: Tag | undefined;
  tagName: string | undefined;
  now: string | undefined;
  data: Bill[] | undefined;
  yearAndMonth: string | undefined;
  created() {
    this.tagName = this.$route.params.id.split("-")[0];
    this.tag = store.findTag(this.tagName);
    if (!this.tag) this.$router.replace("/404");
    this.now = this.$route.params.id.split("-")[1];
    const date = new Date(Number(this.now));
    this.yearAndMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const OneTagBills = store
      .OneTagBills(date)
      .find(i => i.label === this.tagName);
    this.data = OneTagBills ? OneTagBills.data : [];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tagStatistics {
  .main {
    position: fixed;
    top: 98px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    background-color: $light-grey;
    .bills {
      background-color: white;
      .yearAndMonth {
        font-size: $font-size-m;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 25px;
        font-family: $font-number;
      }
      .line {
        height: 50px;
        width: 100vw;
        background-color: $light-grey;
      }
    }
  }
}
</style>