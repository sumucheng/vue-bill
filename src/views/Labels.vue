<template>
  <Layout :hasNav="false">
    <div class="link" @click="back">
      <Icon name="left-white" />
    </div>
    <Header :type.sync="type" />
    <div class="panel">
      <div class="labels">
        <Label v-for="label in displayTags" :key="label.name" :tagName="label.name"></Label>
      </div>
      <div class="add">
        <Button text="新建标签" type="primary" @click.native="addLabel"></Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Label from "@/components/labels/Label.vue";
import Header from "@/components/common/Header.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Label, Header }
})
export default class Labels extends Vue {
  type = "expend";
  get displayTags() {
    return this.$store.getters.filterTags(this.type);
  }
  created() {
    this.$store.commit("fetch");
  }
  addLabel() {
    const name = window.prompt("请输入标签名称（不超过四个字）");
    if (name && name != "") {
      this.$store.commit("createTag", { type: this.type, name: name });
    }
  }
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.link {
  position: fixed;
  top: 55px;
  left: 10px;
  z-index: 10;
  .icon {
    height: 12px;
  }
}
.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .labels {
    margin: 20px;
    overflow: auto;
    max-height: 550px;
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