<template>
  <div class="editLabel">
    <router-link to="/labels" class="link">
      <Icon name="left" />
      <p>返回</p>
    </router-link>
    <div class="name">
      <input v-model="tagName" placeholder="不超过4个字" required maxlength="4" />
    </div>
    <div class="buttons">
      <Button text="确 认" type="primary" :handleClick="editLabel" />
      <Button text="删除标签" type="normal" :handleClick="deleteLabel" />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import model from "../model";

@Component({
  components: { Button }
})
export default class EditLabel extends Vue {
  tags = model.state.tags();
  tag: { type: string; name: string } | undefined;
  tagName = "";
  id = "";
  created() {
    this.id = this.$route.params.id;
    this.tag = this.tags.find(tag => tag.name === this.id);
    if (this.tag) {
      this.tagName = this.tag.name;
    } else {
      this.$router.replace("/404");
    }
  }
  editLabel() {
    if (this.tagName && this.tagName !== "") {
      this.tag!.name = this.tagName;
      model.save.tags(this.tags);
      this.$router.replace("/labels");
    }
  }
  deleteLabel() {
    const index = this.tags.findIndex(tag => tag.name === this.id);
    this.tags.splice(index, 1);
    model.save.tags(this.tags);
    this.$router.replace("/labels");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.editLabel {
  .link {
    margin: 0 20px;
    padding-top: 44px;
    font-size: $font-size-m;
    height: 88px;
    color: $black;
    display: flex;
    align-items: center;
    text-align: center;
    .icon {
      margin-right: 4px;
      height: 12px;
    }
  }

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
</style>