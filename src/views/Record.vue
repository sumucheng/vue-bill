<template>
  <div class="record">
    <Back color="orange" titleText="记一笔" />
    <div class="panel">
      <Tabs :selected.sync="newBill.type" :options="options" />
      <div class="tagsAndNotes">
        <Tags :tags.sync="displayTags" :tag.sync="newBill.tag" @newTag="addTag" />
        <Notes v-model="newBill.note" />
      </div>
      <Computer :count.sync="newBill.count" :handleSubmit="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
import Tabs from "@/components/common/Tabs.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import BillCommon from "../mixins/BillCommon";

@Component({
  components: { Tags, Notes, Computer, Tabs }
})
export default class Record extends mixins(BillCommon) {
  newBill = {
    id: this.createId(),
    type: "expend",
    tag: "一般",
    note: "",
    count: 0,
    time: 0
  };
  options = [
    { en: "expend", zh: "支出" },
    { en: "income", zh: "收入" }
  ];

  get displayTags() {
    return this.$store.getters.filterTags(this.newBill.type);
  }
  created() {
    const id = this.$route.params.id;
    if (id) {
      const bill = this.$store.getters.findBill(Number(id));
      if (bill) this.newBill = bill;
      else this.$router.replace("/404");
    }
  }
  addTag(tagName: string) {
    this.$store.commit("createTag", { type: this.newBill.type, name: tagName });
  }
  handleSubmit() {
    if (this.$store.getters.findBill(this.newBill.id))
      this.$store.commit("editBill", this.newBill);
    else {
      this.newBill.time = Date.now();
      this.$store.commit("createBill", this.newBill);
    }
    this.$router.back();
  }
  @Watch("newBill.type")
  onTypeChange() {
    this.newBill.tag = this.newBill.type === "expend" ? "一般" : "工资";
  }
}
</script>  

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.record {
  background-color: $light-grey;
  height: 100vh;
  .back {
    background-color: white;
  }
  .panel {
    position: fixed;
    z-index: 2;
    top: 98px;
    bottom: 367px;
    background-color: white;
    width: 100%;
    .tagsAndNotes {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 40px;
      bottom: 0;
    }
  }
}
</style>