<template>
  <ul class="tags">
    <li v-for="item in tags" :key="item.name" class="tag" :class="{isSelected:tag===item.name}">
      <div @click="handleSelect">{{item.name}}</div>
    </li>
    <li @click="addTag" class="tag">
      <Icon name="add" />添加标签
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop(Array) tags: string[] | undefined;
  @Prop(String) tag: string | undefined;
  handleSelect(e: Event) {
    this.$emit("update:tag", (e.target as HTMLInputElement).innerText);
  }
  addTag() {
    const name = window.prompt("请输入标签名称（不超过四个字）");
    if (name && name.trim() !== "") {
      this.$emit("newTag", name.trim().substr(0, 4));
      this.$emit("update:tag", name.trim().substr(0, 4));
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tags {
  margin: 15px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  flex-grow: 1;
  .tag {
    height: 34px;
    margin: 7px 8px;
    padding: 0 15px;
    color: $light-orange;
    background-color: $light-yellow;
    border: 1px solid $light-orange;
    border-radius: $border-radius-s;
    font-size: $font-size-m;
    display: flex;
    align-items: center;
    &.isSelected {
      color: white;
      background-color: $orange;
      border-color: $orange;
    }
  }
  .icon {
    width: 12px;
    margin-right: 5px;
  }
}
</style>