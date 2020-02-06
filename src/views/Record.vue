<template>
  <Layout :type.sync="newBill.type">
    <div class="panel">
      <div class="tagsAndNotes">
        <Tags :tags.sync="tags" :tag.sync="newBill.tag" />
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
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
@Component({
  components: { Tags, Notes, Computer }
})
export default class Record extends Vue {
  billList: Bill[] = JSON.parse(window.localStorage.getItem("billList") || "");
  tags = ["一般", "餐饮", "娱乐", "服饰"];
  newBill: Bill = {
    type: "expend",
    tag: "一般",
    note: "",
    count: "",
    time: 0
  };

  handleSubmit() {
    this.newBill.time = Date.now();
    const temp = JSON.parse(JSON.stringify(this.newBill));
    this.billList.push(temp);
  }
  @Watch("billList")
  onBillListChange() {
    window.localStorage.setItem("billList", JSON.stringify(this.billList));
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