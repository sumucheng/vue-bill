<template>
  <Layout :type.sync="type">
    <div class="labels-wrapper">
      <div class="labels">
        <Label v-for="label in displayLabels" :key="label.name">{{label.name}}</Label>
      </div>
      <router-link to="/addLabel">
        <Button text="新建标签" type="primary" class="add"></Button>
      </router-link>
    </div>
  </Layout>
</template>

<script lang="ts">

import Button from "@/components/labels/Button.vue";
import Label from "@/components/labels/Label.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Button, Label }
})
export default class Labels extends Vue {
  displayLabels = this.$store.getters.expendLabels;
  type = "expend";
  @Watch("type")
  onTypeChanged(value: string) {
    this.type = value;
    this.displayLabels =
      this.type === "expend"
        ? this.$store.getters.expendLabels
        : this.$store.getters.incomeLabels;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.labels-wrapper {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  .labels {
    overflow: auto;
    max-height: 500px;
  }
  .add {
    margin-top: 20px;
  }
}
</style>