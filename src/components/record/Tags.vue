<template>
  <div class="tags">
    <Tag v-for="tag in tags" :key="tag">{{tag}}</Tag>
    <Tag @click="addTag">
      <Icon name="add" />添加标签
    </Tag>
  </div>
</template>

<script lang="ts">
import Tag from "@/components/record/Tag.vue";
export default {
  components: { Tag },
  props: ["tags"],
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
  }
  .icon {
    width: 12px;
    margin-right: 5px;
  }
}
</style>