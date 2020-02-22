<template>
  <div>
    <div class="link" @click="$router.back()">
      <Icon name="left-white" />
    </div>
    <Header :type.sync="type" />
    <div class="panel">
      <div class="labels">
        <Label v-for="tag in displayTags" :key="tag.name" :tagName="tag.name"></Label>
      </div>
      <div class="add">
        <Button text="新建标签" type="primary" @click.native="addTag(type)"></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Label from "@/components/labels/Label.vue";
import Header from "@/components/common/Header.vue";
import TagCommon from "@/mixins/TagCommon";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({
  components: { Button, Label, Header }
})
export default class Labels extends mixins(TagCommon) {
  type = "expend";
  get displayTags() {
    return this.$store.getters.filterTags(this.type);
  }
  created() {
    this.$store.commit("fetch");
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