<template>
  <div class="note">
    <input type="text" placeholder="添加备注" />
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.note {
  margin-top: 0px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  > input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
    background-color: $light-grey;
    border-radius: $border-radius-m;
    border-style: none;
    font-size: $font-size-m;
    color: $light-grey;
  }
}
</style>