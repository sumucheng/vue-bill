<template>
  <div class="tabs">
    <div
      class="item"
      v-for="item in options"
      :key="item.en"
      :class="{active:selected===item.en}"
      @click="$emit('update:selected',item.en)"
    >
      <div class="text">{{options.find(i=>i.en===item.en).zh}}</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {
  @Prop() options!: { en: string; zh: string }[];
  @Prop() selected!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tabs {
  padding-top: 12px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid $border-grey;
  .item {
    position: relative;
    .text {
      margin-bottom: 8px;
      font-size: $font-size-m;
      padding: 0 3px;
    }
    &.active {
      .text {
        color: $orange;
      }
      .line {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        background-color: $orange;
        height: 3px;
        border-radius: 2px;
      }
    }
  }
}
</style>