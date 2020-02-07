<template>
  <button :class="type" @click="handleClick">{{text}}</button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["text", "type", "handleClick"]
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
button {
  border-radius: $border-radius-m;
  height: 45px;
  width: 100%;
  font-size: $font-size-l;
  &.primary {
    background-image: linear-gradient(141deg, #ff8700 0%, #ffce4c 100%);
    color: white;
  }
  &.normal {
    background-color: white;
    color: $dark-grey;
  }
}
</style>