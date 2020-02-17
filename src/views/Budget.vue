<template>
  <div class="budget">
    <Back titleText="本月预算" />
    <div class="main">
      <div class="line"></div>
      <div class="rest">
        <div class="text">剩余预算</div>
        <div class="count">{{budget.rest}}</div>
      </div>
      <div class="sum">
        <div class="text">总预算</div>
        <div class="count">{{budget.sum}}</div>
      </div>
      <div class="daily">
        <div class="text">剩余每日可用</div>
        <div class="count">{{budget.dailyCanUse}}</div>
      </div>
      <Button text="设置每月预算" type="primary" />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/store";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Back }
})
export default class Budget extends Vue {
  budget = store.budget;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.budget {
  .main {
    position: fixed;
    top: 88px;
    width: 100vw;
    padding: 0 20px;
    .line {
      height: 10px;
      width: 100vw;
      background-color: $border-grey;
    }
  }
}
</style>