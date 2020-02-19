<template>
  <div class="billDetail">
    <Back titleText="详情" />
    <div class="main">
      <div class="line"></div>
      <div class="detail">
        <div class="title">
          <div>{{bill.tag}}</div>
          <div class="count">{{(bill.type==='expend'?'-':'+')+bill.count}}</div>
        </div>
        <Item text="时间" :content="getDate(bill.time)" />
        <Item text="备注" :content="bill.note" />
      </div>
      <div class="buttons">
        <router-link :to="`/record/${bill.id}`">
          <Button text="编 辑" type="primary" />
        </router-link>
        <Button text="删 除" type="normal" @click.native="deleteBill" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BillCommon from "@/mixins/BillCommon";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";
import Item from "@/components/detail/Item.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({
  components: { Button, Back, Item }
})
export default class EditLabel extends mixins(BillCommon) {
  bill: Bill | undefined;
  id!: number;
  created() {
    this.id = Number(this.$route.params.id);
    this.bill = this.$store.getters.findBill(this.id);
    if (!this.bill) this.$router.replace("/404");
  }
  getDate(n: number) {
    const yearText = new Date(n).getFullYear();
    const d = this.displayDate(n);
    return `${yearText}-${d.monthText}-${d.dateText}`;
  }
  deleteBill() {
    this.$store.commit("deleteBill", this.id);
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.billDetail {
  .main {
    position: fixed;
    top: 88px;
    width: 100vw;
    .line {
      height: 10px;
      width: 100vw;
      background-color: $light-grey;
    }
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
    .buttons {
      margin: 20px;
      margin-top: 40px;
      button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>