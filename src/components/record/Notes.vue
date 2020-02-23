<template>
  <div class="note">
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      maxlength="15"
      placeholder="添加备注"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop(String) value: string | undefined;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.note {
  position: absolute;
  bottom: 15px;
  right: 20px;
  left: 20px;
  > input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
    background-color: $light-grey;
    border-radius: $border-radius-m;
    border-style: none;
    font-size: $font-size-m;
    color: $grey;
  }
}
</style>