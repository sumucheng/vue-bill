<template>
  <HeaderLayout titleText="设置预算">
    <Computer :handleSubmit="handleSubmit" :count.sync="count" />
  </HeaderLayout>
</template>

<script lang="ts">
import Computer from "@/components/record/Computer.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Computer }
})
export default class Budget extends Vue {
  count = this.$store.state.budget.sum > 0 ? this.$store.state.budget.sum : 0;
  handleSubmit() {
    this.$store.commit("settingBudget", this.count);
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.budget {
  .main {
    position: fixed;
    top: 88px;
    width: 100vw;
    display: flex;
    flex-direction: column;

    .line {
      height: 10px;
      width: 100vw;
      background-color: $light-grey;
    }
  }
}
</style>