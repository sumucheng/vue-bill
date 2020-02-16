<template>
  <Layout :hasNav="false">
    <div class="link" @click="back">
      <Icon name="left-white" />
    </div>
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
.link {
  position: fixed;
  top: 40px;
  left: 10px;
  height: 44px;
  z-index: 10;
  font-size: $font-size-m;
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
  .icon {
    margin-right: 4px;
    height: 12px;
  }
}
.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  bottom: 340px;
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