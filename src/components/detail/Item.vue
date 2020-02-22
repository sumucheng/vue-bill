<template>
  <div class="row">
    <div class="name">{{text}}</div>
    <div class="value">{{content}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Item extends Vue {
  @Prop() text!: string;
  @Prop() content!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.row {
  height: 55px;
  margin: 0 25px;
  display: flex;
  align-items: center;
  font-size: $font-size-m;
  border-top: 2px solid white;
  .name {
    color: $grey;
    margin-right: 15px;
  }
}
</style>