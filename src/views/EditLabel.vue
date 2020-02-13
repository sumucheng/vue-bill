<template>
  <div class="editLabel">
    <Back titleText="编辑标签" />
    <div class="main">
      <div class="name">
        <input v-model="newName" placeholder="不超过4个字" required maxlength="4" />
      </div>
      <div class="buttons">
        <Button text="确 认" type="primary" :handleClick="editLabel" />
        <Button text="删除标签" type="normal" :handleClick="deleteLabel" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/tagStore";
import Button from "@/components/labels/Button.vue";
import Back from "@/components/layout/Back.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { Button, Back }
})
export default class EditLabel extends Vue {
  tags = store.tags;
  tag: Tag | undefined;
  newName = "";
  created() {
    this.tag = store.findTag(this.$route.params.id);
    if (this.tag) {
      this.newName = this.tag.name;
    } else {
      this.$router.replace("/404");
    }
  }
  editLabel() {
    if (this.newName && this.newName !== "") {
      if (store.editTag(this.tag!, this.newName)) this.$router.back();
    }
  }
  deleteLabel() {
    if (store.deleteTag(this.tag!)) this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.editLabel {
  .main {
    .name {
      margin: 20px;
      > input {
        width: 100%;
        height: 50px;
        padding-left: 20px;
        background-color: $light-grey;
        border-radius: $border-radius-m;
        border-style: none;
        font-size: $font-size-m;
        color: $dark-grey;
      }
    }
    .buttons {
      margin: 20px;
      margin-top: 40px;
      button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>