<template>
  <div>
    <Layout>
      <Header />
      <div class="panel">
        <div>
          <div class="labels">
            <Tag v-for="tag in tags" :key="tag">{{tag}}</Tag>
            <Tag @click="addTag">
              <Icon name="add" />添加标签
            </Tag>
          </div>
          <div class="note">
            <input v-model="message" placeholder="添加备注" />
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
      tags: ["餐饮", "娱乐", "服饰", "交通", "旅行", "社交", "学习", "通讯"],
      message: ""
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
  height: 100%;
  .labels {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    height: 85px;
    overflow: auto;
    .tag {
      margin-bottom: 15px;
    }
    .icon {
      width: 12px;
      margin-right: 5px;
    }
  }
  .note {
    margin: 20px;
    > input {
      width: 100%;
      height: 50px;
      padding-left: 20px;
      background-color: $light-grey;
      border-radius: $border-radius-m;
      border-style: none;
      font-size: $font-size-m;
      color: $light-grey;
    }
  }
}
</style>