<template>
  <Layout :type.sync="type">
    <div class="panel">
      <div class="tagsAndNotes">
        <Tags :tags.sync="tags" :tag.sync="tag" />
        <Notes v-model="note" />
      </div>
      <Computer :handleSubmit="handleSubmit" :count.sync="count" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
@Component({
  components: { Tags, Notes, Computer }
})
export default class Record extends Vue {
  tags = ["一般", "餐饮", "娱乐", "服饰"];
  type = "expend";
  tag = "一般";
  note = "";
  count = 0;

  handleSubmit() {
    const newBill = {
      type: this.type,
      tag: this.tag,
      note: this.note,
      count: this.count,
      time: Date.now()
    };

    console.log(newBill);
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