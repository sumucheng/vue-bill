<template>
  <div class="detail">
    <div class="title">
      <div>{{bill.tag}}</div>
      <div class="count">{{(bill.type==='expend'?'-':'+')+bill.count}}</div>
    </div>
    <Item text="时间" :content="getDate(bill.time)" />
    <Item text="备注" :content="bill.note" />
  </div>
</template>

<script lang="ts">
import Item from "@/components/billDetail/Item.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
@Component({
  components: { Item }
})
export default class Card extends Vue {
  @Prop() bill: Bill | undefined;
  getDate(n: number) {
    return dayjs(n).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.detail {
  margin: 20px;
  display: flex;
  flex-direction: column;
  border-radius: $border-radius-m;
  background-color: $light-grey;
  .title {
    font-size: $font-size-l;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    font-weight: bold;
    .count {
      font-family: $font-number;
    }
  }
}
</style>