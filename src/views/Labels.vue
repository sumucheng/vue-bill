<template>
  <Layout>
    <Header :type.sync="type" />
    <div class="panel">
      <div class="labels">
        <Label v-for="label in displayTags" :key="label.name" :tagName="label.name"></Label>
      </div>
      <div class="add">
        <Button text="新建标签" type="primary" :handleClick="addLabel"></Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import store from "@/store/tagStore";

import Button from "@/components/labels/Button.vue";
import Label from "@/components/labels/Label.vue";
import Header from "@/components/layout/Header.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Label, Header }
})
export default class Labels extends Vue {
  type = "expend";
  displayTags = store.filterTags(this.type);
  @Watch("type")
  onTypeChanged(value: string) {
    this.displayTags = store.filterTags(this.type);
  }
  addLabel() {
    const name = window.prompt("请输入标签名称（不超过四个字）");
    if (name && name != "") {
      store.createTag(this.type, name);
      this.displayTags = store.filterTags(this.type);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  bottom: 420px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .labels {
    margin: 20px;
    overflow: auto;
    max-height: 500px;
  }
  .add {
    margin-top: 20px;
    margin: 20px;
  }
}
@media (max-height: 800px) {
  .labels-wrapper .labels {
    max-height: 400px;
  }
}
@media (max-height: 700px) {
  .labels-wrapper .labels {
    max-height: 350px;
  }
}
@media (min-height: 1000px) {
  .labels-wrapper .labels {
    max-height: 700px;
  }
}
</style>