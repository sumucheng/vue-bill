<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {};
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
