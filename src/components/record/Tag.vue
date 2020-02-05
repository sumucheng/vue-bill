<template>
  <div class="tag" :class="{isSelected:isSelected}">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["isSelected"]
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tag {
  color: $light-orange;
  background-color: $light-yellow;
  border: 1px solid $light-orange;
  font-size: $font-size-l;
  border-radius: $border-radius-s;
  height: 34px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: 20px;
  &.isSelected {
    color: white;
    background-color: $orange;
    border-color: $orange;
  }
}
</style>