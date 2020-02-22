<template>
  <div class="tagList">
    <Back color="orange" titleText="标签管理" />
    <div class="panel">
      <Tabs :selected.sync="type" :options="options" />
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
.tagList {
  background-color: $light-grey;
  min-height: 108px;
  .back {
    background-color: white;
  }
  .panel {
    position: fixed;
    z-index: 2;
    top: 98px;
    background-color: white;
    width: 100%;
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