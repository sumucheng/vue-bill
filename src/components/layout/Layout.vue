<template>
  <div class="wrapper">
    <Header :handleExpend="handleExpend" :handleIncome="handleIncome" />
    <div class="main">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Header from "@/components/layout/Header.vue";
import Nav from "@/components/layout/Nav.vue";
export default {
  components: { Header, Nav },
  props: ["handleExpend", "handleIncome"]
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main {
    position: fixed;
    z-index: 2;
    top: 114px;
    bottom: 81px;
    background-color: white;
    width: 100%;
    border-radius: $border-radius-l;
  }
}
</style>