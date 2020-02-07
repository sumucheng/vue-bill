<template>
  <Layout :type.sync="newBill.type">
    <div class="panel">
      <div class="tagsAndNotes">
        <Tags :tags.sync="displayTags" :tag.sync="newBill.tag" @newTag="addTag" />
        <Notes v-model="newBill.note" />
      </div>
      <Computer :count.sync="newBill.count" :handleSubmit="handleSubmit" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import model from "@/model.ts";

import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
type Tag = {
  type: string;
  name: string;
};
@Component({
  components: { Tags, Notes, Computer }
})
export default class Record extends Vue {
  billList = model.state.billList();
  tags = model.state.tags();
  mounted() {
    if (this.tags.length === 0) {
      this.tags = [
        { type: "expend", name: "一般" },
        { type: "expend", name: "餐饮" },
        { type: "expend", name: "娱乐" },
        { type: "expend", name: "服饰" },
        { type: "expend", name: "交通" },
        { type: "expend", name: "通讯" },
        { type: "income", name: "工资" },
        { type: "income", name: "理财" },
        { type: "income", name: "礼金" },
        { type: "income", name: "其他" }
      ];
    }
  }

  newBill: Bill = {
    type: "expend",
    tag: "一般",
    note: "",
    count: "",
    time: 0
  };
  displayTags: Tag[] = this.tags.filter(tag => tag.type === this.newBill.type);
  addTag(tagName: string) {
    if (this.tags.find(tag => tag.name === tagName)) return;
    this.tags.push({ type: this.newBill.type, name: tagName });
  }
  handleSubmit() {
    this.newBill.time = Date.now();
    const temp = JSON.parse(JSON.stringify(this.newBill));
    this.billList.push(temp);
    this.newBill.note = "";
    this.newBill.tag = this.newBill.type === "expend" ? "一般" : "工资";
  }
  @Watch("billList")
  onBillListChange() {
    model.save.billList(this.billList);
  }
  @Watch("tags")
  onTagsChange() {
    model.save.tags(this.tags);
    this.displayTags = this.tags.filter(tag => tag.type === this.newBill.type);
  }
  @Watch("newBill.type")
  onTypeChange() {
    this.displayTags = this.tags.filter(tag => tag.type === this.newBill.type);
    this.newBill.tag = this.newBill.type === "expend" ? "一般" : "工资";
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
  .tagsAndNotes {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
@media (max-height: 735px) {
  .panel {
    top: 114px;
    bottom: 370px;
  }
}
@media (min-width: 500px) {
  .panel {
    top: 114px;
    bottom: 630px;
  }
}
</style>