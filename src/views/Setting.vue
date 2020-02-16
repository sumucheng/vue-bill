<template>
  <Layout>
    <nav class="setting">
      <router-link v-for="link in links" :key="link.link" :to="link.link">
        <p>{{link.text}}</p>
      </router-link>
    </nav>
  </Layout>
</template>

<script lang="ts">
import store from "../store/store";

import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Setting extends Vue {
  links = [
    { text: "标签管理", link: "/labels" },
    { text: "年账单", link: "/annualBill" },
    { text: "预算设置", link: "/" }
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

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