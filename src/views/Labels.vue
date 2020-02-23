<template>
  <HeaderLayout color="orange" titleText="标签管理">
    <Tabs :selected.sync="type" :options="options" />
    <div class="labels">
      <Label v-for="tag in displayTags" :key="tag.name" :tagName="tag.name"></Label>
    </div>
    <div class="add">
      <Button text="新建标签" type="primary" @click.native="addTag(type)"></Button>
    </div>
  </HeaderLayout>
</template>

<script lang="ts">
import Label from "@/components/labels/Label.vue";
import Tabs from "@/components/common/Tabs.vue";
import TagCommon from "@/mixins/TagCommon";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({
  components: { Label, Tabs }
})
export default class Labels extends mixins(TagCommon) {
  type = "expend";
  options = [
    { en: "expend", zh: "支出" },
    { en: "income", zh: "收入" }
  ];
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
.labels {
  margin: 20px;
  overflow: auto;
  max-height: 550px;
}
.add {
  margin-top: 20px;
  margin: 20px;
}
</style>