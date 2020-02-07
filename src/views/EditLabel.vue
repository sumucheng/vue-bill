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
  tagIndex = -1;
  tagName = "";
  route = "";
  created() {
    this.route = this.$route.params.id;
    this.tagIndex = this.tags.findIndex(tag => tag.name === this.route);
    if (this.tagIndex > -1) {
      this.tagName = this.tags[this.tagIndex].name;
    } else {
      this.$router.replace("/404");
    }
  }
  editLabel() {
    if (
      this.tagName &&
      this.tagName !== "" &&
      !this.tags.find(tag => tag.name === this.tagName)
    ) {
      this.tags[this.tagIndex].name = this.tagName;
      this.end();
    }
  }
  deleteLabel() {
    this.tags.splice(this.tagIndex, 1);
    this.end();
  }
  end() {
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