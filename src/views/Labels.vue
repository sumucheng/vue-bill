<template>
  <Layout :type.sync="type">
    <div class="labels-wrapper">
      <div class="labels">
        <Label v-for="label in displayLabels" :key="label.name" :tagName="label.name"></Label>
      </div>
      <Button text="新建标签" type="primary" class="add" :handleClick="addLabel"></Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Label from "@/components/labels/Label.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tagsModel from "@/model/tagsModel";
tagsModel.fetch();
@Component({
  components: { Button, Label }
})
export default class Labels extends Vue {
  tags = tagsModel.data;
  displayLabels = tagsModel.display("expend");
  type = "expend";
  @Watch("type")
  onTypeChanged(value: string) {
    this.displayLabels = tagsModel.display(this.type);
  }
  addLabel() {
    const name = window.prompt("请输入标签名称（不超过四个字）");
    if (name && name != "") {
      const result = tagsModel.add({ type: this.type, name: name });
      if (result !== "success") window.alert(result);
      this.displayLabels = tagsModel.display(this.type);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.labels-wrapper {
  margin: 20px;
  .labels {
    overflow: auto;
    max-height: 500px;
  }
  .add {
    margin-top: 20px;
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