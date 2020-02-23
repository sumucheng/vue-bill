<template>
  <HeaderLayout titleText="详情">
    <Card :bill="bill" />
    <div class="buttons">
      <router-link :to="`/record/${bill.id}`">
        <Button text="编 辑" type="primary" />
      </router-link>
      <Button text="删 除" type="normal" @click.native="deleteBill" />
    </div>
  </HeaderLayout>
</template>

<script lang="ts">
import Card from "@/components/billDetail/Card.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
@Component({
  components: { Card }
})
export default class BillDetail extends Vue {
  bill: Bill | undefined;
  id!: number;
  created() {
    this.id = Number(this.$route.params.id);
    this.bill = this.$store.getters.findBill(this.id);
    if (!this.bill) this.$router.replace("/404");
  }
  deleteBill() {
    this.$store.commit("deleteBill", this.id);
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.buttons {
  margin: 20px;
  margin-top: 40px;
  button {
    margin-bottom: 10px;
  }
}
</style>