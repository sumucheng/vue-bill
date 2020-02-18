<template>
  <div class="tagStatistics">
    <Back :titleText="tag.name" />
    <div class="main">
      <div class="line"></div>
      <div class="bills">
        <div class="yearAndMonth">{{yearAndMonth}}</div>
        <BillItem v-for="bill in data" :key="bill.time" :bill="bill" />
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BillItem from "@/components/category/Bill.vue";
import Back from "@/components/common/Back.vue";
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
    this.tag = this.$store.getters.findTag(this.tagName);
    if (!this.tag) this.$router.replace("/404");
    this.now = this.$route.params.id.split("-")[1];
    const date = new Date(Number(this.now));
    this.yearAndMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const OneTagBills = this.$store.getters
      .OneTagBills(date)
      .find((i: oneTagBills) => i.label === this.tagName);
    this.data = OneTagBills ? OneTagBills.data : [];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tagStatistics {
  .main {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    background-color: $light-grey;
    .line {
      height: 10px;
      width: 100vw;
      background-color: $light-grey;
    }
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