<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      bills: [
        { type: "expend", count: 100, time: "", label: "餐饮" },
        { type: "income", count: 3000, time: "", label: "工资" },
        { type: "expend", count: 10, time: "", label: "交通", note: "地铁" }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/normal.scss";
#app {
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  font-size: $font-size-s;
}
</style>
