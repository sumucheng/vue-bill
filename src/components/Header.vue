<template>
  <div>
    <img src="../assets/background.png" class="background" />
    <div class="type">
      <div class="wrapper" :class="{active:isExpend}" @click="isExpend=true">
        <a>支出</a>
        <div class="dot"></div>
      </div>
      <div class="wrapper" :class="{active:!isExpend}" @click="isExpend=false">
        <a>收入</a>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isExpend: true
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.type {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  margin-top: 44px;
  margin-bottom: 20px;
  > .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 37px;
    > a {
      font-size: $font-size-l;
      color: white;
      opacity: 0.7;
    }
    > .dot {
      height: 5px;
      width: 5px;
      margin-top: 8px;
      border-radius: 50%;
      background-color: white;
      display: none;
    }
  }
  > .active {
    > a {
      opacity: 1;
    }
    > .dot {
      display: block;
    }
  }
}
</style>