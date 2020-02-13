<template>
  <div class="switch">
    <button
      @click="$emit('update:selected',text[0].en)"
      :class="{active:selected===text[0].en}"
      class="left"
    >{{text[0].zh}}</button>
    <button
      @click="$emit('update:selected',text[1].en)"
      :class="{active:selected===text[1].en}"
      class="right"
    >{{text[1].zh}}</button>
  </div>
</template>
 
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Switch extends Vue {
  @Prop() text!: { en: string; zh: string }[];
  @Prop() selected!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.switch {
  position: absolute;
  right: 20px;
  top: 5px;
  z-index: 5;
  display: flex;
  button {
    background-color: white;
    color: $orange;
    width: 24px;
    height: 22px;
    overflow: hidden;
    border: 1px solid $orange;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      background-color: $orange;
      color: white;
    }
    &.left {
      border-top-left-radius: $border-radius-s;
      border-bottom-left-radius: $border-radius-s;
      border-right: none;
    }
    &.right {
      border-top-right-radius: $border-radius-s;
      border-bottom-right-radius: $border-radius-s;
      border-left: none;
    }
  }
}
</style>