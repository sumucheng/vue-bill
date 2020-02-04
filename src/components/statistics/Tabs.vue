<template>
  <div class="tabs">
    <div class="item" :class="{active:active==='day'}" @click="active='day'">
      <div class="text">按天</div>
      <div class="line"></div>
    </div>
    <div class="item" :class="{active:active==='week'}" @click="active='week'">
      <div class="text">按周</div>
      <div class="line"></div>
    </div>
    <div class="item" :class="{active:active==='month'}" @click="active='month'">
      <div class="text">按月</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      active: "day"
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tabs {
  padding-top: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid $light-grey;
  .item {
    position: relative;
    .text {
      margin-bottom: 8px;
      font-size: $font-size-m;
      padding: 0 3px;
    }
    &.active {
      .text {
        color: $orange;
      }
      .line {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        background-color: $orange;
        height: 3px;
        border-radius: 2px;
      }
    }
  }
}
</style>