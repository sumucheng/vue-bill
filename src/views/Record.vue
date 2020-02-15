<template>
  <Layout>
    <Header :type.sync="newBill.type" />
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
import store from "@/store/store";

import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
import Header from "@/components/layout/Header.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, Computer, Header }
})
export default class Record extends Vue {
  tags = store.tags;
  newBill = store.initNewBill();
  get displayTags() {
    return store.filterTags(this.newBill.type, this.tags);
  }
  addTag(tagName: string) {
    store.createTag(this.newBill.type, tagName);
  }
  handleSubmit() {
    this.newBill.time = Date.now();
    store.createBill(this.newBill);
    this.newBill.id = store.bills[0].id + 1;
    this.newBill.note = "";
    this.newBill.tag = this.newBill.type === "expend" ? "一般" : "工资";
  }
  @Watch("newBill.type")
  onTypeChange() {
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