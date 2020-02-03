<template>
  <div class="bill">
    <div>{{bill.label}}</div>
    <div>{{bill.type==='expend'?'-':'+'+bill.count}}</div>
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
.label {
  background-color: $light-grey;
  font-size: $font-size-m;
  height: 70px;
  margin-bottom: 10px;
  font-size: $font-size-m;
  font-family: $font-family-m;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 20px;
  border-radius: $border-radius-m;
  .right {
    color: $blue;
    .icon {
      height: 12px;
    }
  }
}
</style>