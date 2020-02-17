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
import store from "@/store/store";

import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
import Tabs from "@/components/record/Tabs.vue";
import Back from "@/components/layout/Back.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, Computer, Back, Tabs }
})
export default class Record extends Vue {
  tags = store.tags;
  newBill = store.initNewBill();
  options = [
    { en: "expend", zh: "支出" },
    { en: "income", zh: "收入" }
  ];

  get displayTags() {
    return store.filterTags(this.newBill.type, this.tags);
  }
  created() {
    const id = this.$route.params.id;
    if (id) {
      const bill = store.findBill(Number(id));
      if (bill) this.newBill = bill;
      else this.$router.replace("/404");
    }
  }
  addTag(tagName: string) {
    store.createTag(this.newBill.type, tagName);
  }
  handleSubmit() {
    this.newBill.time = Date.now();
    if (store.findBill(this.newBill.id)) store.editBill(this.newBill);
    else store.createBill(this.newBill);
    this.$router.back();
  }
  @Watch("newBill.type")
  onTypeChange() {
    this.newBill.tag = this.newBill.type === "expend" ? "一般" : "工资";
  }
  back() {
    this.$router.back();
  }
}
</script>  

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.record {
  background-color: $light-grey;
  height: 100vh;
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