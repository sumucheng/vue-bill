<template>
  <NavLayout>
    <IntoAnnual />
    <IntoBudget />
    <router-link to="/labels" class="tags">
      <div class="title">标签管理</div>
      <Icon name="right" />
    </router-link>
  </NavLayout>
</template>

<script lang="ts">
import IntoAnnual from "@/components/setting/IntoAnnual.vue";
import IntoBudget from "@/components/setting/IntoBudget.vue";
import NavLayout from "@/components/layout/NavLayout.vue";
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: { IntoAnnual, IntoBudget, Layout }
})
export default class Setting extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.tags {
  padding: 15px;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: white;
  border-radius: $border-radius-s;
  .title {
    font-size: $font-size-m;
  }
}
</style>