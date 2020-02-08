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
import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
import tagsModel from "@/model/tagsModel.ts";
tagsModel.fetch();
import billsModel from "@/model/billsModel.ts";
billsModel.fetch();
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: number;
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
  billList = billsModel.data;
  tags = tagsModel.data;
  newBill: Bill = {
    type: "expend",
    tag: "一般",
    note: "",
    count: 0,
    time: 0
  };
  displayTags: Tag[] = tagsModel.display(this.newBill.type);
  addTag(tagName: string) {
    tagsModel.add({ type: this.newBill.type, name: tagName });
  }
  handleSubmit() {
    this.newBill.time = Date.now();
    billsModel.add(JSON.parse(JSON.stringify(this.newBill)));
    this.newBill.note = "";
    this.newBill.tag = this.newBill.type === "expend" ? "一般" : "工资";
  }
  @Watch("billList")
  onBillListChange() {
    billsModel.save();
  }
  @Watch("tags")
  onTagsChange() {
    tagsModel.save();
    this.displayTags = tagsModel.display(this.newBill.type);
  }
  @Watch("newBill.type")
  onTypeChange() {
    this.displayTags = tagsModel.display(this.newBill.type);
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