<template>
  <ul class="tags">
    <li v-for="tag in tags" :key="tag" class="tag" :class="{isSelected:selectedTag===tag}">
      <div @click="handleSelect">{{tag}}</div>
    </li>
    <li @click="addTag" class="tag">
      <Icon name="add" />添加标签
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: ["tags", "selectedTag", "handleSelect"],
  methods: {
    addTag() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tags {
  margin: 20px 15px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  flex-grow: 1;
  .tag {
    margin-bottom: 15px;
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
  .icon {
    width: 12px;
    margin-right: 5px;
  }
}
</style>