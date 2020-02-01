<template>
  <div class="wrapper">
    <div class="main">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  overflow: auto;
  flex-grow: 1;
}
</style>