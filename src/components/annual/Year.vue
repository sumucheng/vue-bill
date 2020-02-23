<template>
  <div class="year">
    <div class="line"></div>
    <Icon name="solid-left" class="left" @click.native="preYear" />
    {{year}}年
    <Icon name="solid-right" class="right" @click.native="nextYear" />
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component
export default class Year extends Vue {
  @Prop({ default: new Date() }) now!: Date;
  get year() {
    return this.now.getFullYear();
  }
  preYear() {
    this.$emit("update:now", new Date(this.now.setFullYear(this.year - 1)));
  }
  nextYear() {
    this.$emit("update:now", new Date(this.now.setFullYear(this.year + 1)));
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.year {
  font-size: $font-size-l;
  display: flex;
  justify-content: center;
  align-items: center;
  .line {
    width: 35%;
    border-bottom: 1px dotted rgba($color: white, $alpha: 0.6);
  }
  .icon {
    height: 14px;
    margin: 0 4px;
  }
}
</style>