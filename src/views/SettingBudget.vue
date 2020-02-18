<template>
  <div class="budget">
    <Back titleText="设置预算" />
    <div class="main">
      <Computer :handleSubmit="handleSubmit" :count.sync="count" />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Back from "@/components/common/Back.vue";
import Computer from "@/components/record/Computer.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Back, Computer }
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