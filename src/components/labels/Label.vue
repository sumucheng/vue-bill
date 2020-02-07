<template>
  <router-link class="label" :to="`/labels/edit/${tagName}`">
    {{tagName}}
    <Icon name="right" class="right" />
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Label extends Vue {
  @Prop(String) tagName: string | undefined;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.label {
  background-color: $light-grey;
  font-size: $font-size-m;
  height: 60px;
  margin-bottom: 10px;
  font-size: $font-size-m;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 20px;
  border-radius: $border-radius-m;
  .right {
    color: $blue;
    .icon {
      height: 12px;
    }
  }
}
</style>