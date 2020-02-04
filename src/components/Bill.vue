<template>
  <div class="bill">
    <div class="left">
      <div class="label">{{bill.label}}</div>
      <div class="note">{{bill.note}}</div>
    </div>
    <div class="count">{{(bill.type==='expend'?'-':'+')+bill.count}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["bill"]
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.bill {
  display: flex;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 20px;
  height: 70px;
  background-color: $light-grey;
  margin-bottom: 10px;
  border-radius: $border-radius-m;
  align-items: center;
  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .label {
      font-size: $font-size-m;
      line-height: 1.5em;
    }
    .note {
      color: $grey;
      font-size: $font-size-s;
    }
  }
  .count {
    font-family: $font-number;
    font-size: $font-size-l;
    text-align: right;
    font-weight: bold;
  }
}
</style>