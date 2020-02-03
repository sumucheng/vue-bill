<template>
  <div>
    <Layout>
      <Header />
      <div class="panel">
        <div>
          <div class="labels">
            <Tag v-for="tag in tags" :key="tag">{{tag}}</Tag>
            <Tag @click="addTag">+ 添加标签</Tag>
          </div>
          <div class="note">
            <input type="text" />
          </div>
        </div>
        <Computer />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Tag from "@/components/Tag.vue";
import Computer from "@/components/Computer.vue";
export default {
  components: { Header, Tag, Computer },
  data() {
    return {
      tags: ["餐饮", "娱乐", "服饰", "交通"]
    };
  },
  methods: {
    addTag() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .labels {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    height: 83px;
  }
  .note {
    height: 120px;
    background-color: $light-grey;
    border-radius: $border-radius-m;
    margin: 20px;
    margin-top: 0px;
    > input {
      margin: 20px;
    }
  }
}
</style>