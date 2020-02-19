<template>
  <Layout>
    <TotalBill />
    <router-link to="/labels" class="tags">
      <div class="title">标签管理</div>
      <Icon name="right" />
    </router-link>
    <nav class="setting">
      <router-link v-for="link in links" :key="link.link" :to="link.link">
        <p>{{link.text}}</p>
      </router-link>
    </nav>
  </Layout>
</template>

<script lang="ts">
import TotalBill from "@/components/setting/TotalBill.vue";
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: { TotalBill }
})
export default class Setting extends Vue {
  links = [
    { text: "标签管理", link: "/labels" },
    { text: "预算设置", link: "/budget" }
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px;
  margin: 10px;
  background-color: white;
  border-radius: $border-radius-s;
}
.setting {
  display: flex;
  flex-direction: column;

  > * {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid $border-grey;
  }
}
</style>