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
import model from "@/model.ts";

@Component({
  components: { Button, Label }
})
export default class Labels extends Vue {
  tags = model.state.tags();
  expendLabels = this.tags.filter(tag => tag.type === "expend");
  incomeLabels = this.tags.filter(tag => tag.type === "income");
  displayLabels = this.expendLabels;
  type = "expend";
  @Watch("type")
  onTypeChanged(value: string) {
    this.displayLabels =
      this.type === "expend" ? this.expendLabels : this.incomeLabels;
  }
  addLabel() {
    const name = window.prompt("请输入标签名称（不超过四个字）");
    if (name && name != "") {
      if (this.tags.find(tag => tag.name === name)) {
        window.alert("该标签已存在");
        return;
      }
      this.tags.push({ type: this.type, name: name });
      model.save.tags(this.tags);
      this.displayLabels = this.tags.filter(tag => tag.type === this.type);
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