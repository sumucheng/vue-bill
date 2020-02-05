<template>
  <Layout>
    <div class="panel">
      <div class="tagsAndNotes">
        <Tags :tags="tags" :selectedTag="selectedTag" :handleSelect="handleSelect" />
        <Notes />
      </div>
      <Computer />
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
      tags: ["餐饮", "娱乐", "服饰", "交通", "旅行", "社交", "学习", "通讯"],
      selectedTag: ""
    };
  },
  methods: {
    handleSelect(e: Event) {
      this.selectedTag = (e.target as HTMLInputElement).innerText;
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
</style>