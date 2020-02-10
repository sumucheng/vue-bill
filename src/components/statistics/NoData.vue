<template>
  <div class="noData">
    <Icon name="noData" />
    <div class="text">暂无数据</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BillList extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.noData {
  display: flex;
  flex-direction: column;
  .icon {
    width: 193px;
    height: 133px;
  }
  .text {
    margin-top: 30px;
    font-size: $font-size-m;
    color: $grey;
  }
}
</style>