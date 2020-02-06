<template>
  <Layout :handleExpend="handleExpend" :handleIncome="handleIncome">
    <div class="panel">
      <div class="tagsAndNotes">
        <Tags :tags.sync="tags" :selectedTag.sync="selectedTag" :handleSelect="handleSelect" />
        <Notes v-model="note" />
      </div>
      <Computer :handleSubmit="handleSubmit" v-bind:count.sync="count" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/record/Tags.vue";
import Notes from "@/components/record/Notes.vue";
import Computer from "@/components/record/Computer.vue";
export default {
  components: { Tags, Notes, Computer },
  data() {
    return {
      tags: ["一般", "餐饮", "娱乐", "服饰"],
      type: "expend",
      selectedTag: "一般",
      note: "",
      count: 0
    };
  },
  methods: {
    handleExpend() {
      this.type = "expend";
    },
    handleIncome() {
      this.type = "income";
    },
    handleSelect(e: Event) {
      this.selectedTag = (e.target as HTMLInputElement).innerText;
    },
    handleSubmit() {
      console.log(this.type, this.selectedTag, this.note, this.count);
    }
  }
};
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