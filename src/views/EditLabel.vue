<template>
  <div class="editLabel">
    <div class="title">
      <div class="link" @click="back">
        <Icon name="left" />返回
      </div>
      <div class="titleText">编辑标签</div>
    </div>
    <div class="line"></div>
    <div class="main">
      <div class="name">
        <input v-model="tagName" placeholder="不超过4个字" required maxlength="4" />
      </div>
      <div class="buttons">
        <Button text="确 认" type="primary" :handleClick="editLabel" />
        <Button text="删除标签" type="normal" :handleClick="deleteLabel" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tagsModel from "@/model/tagsModel";
tagsModel.fetch();

@Component({
  components: { Button }
})
export default class EditLabel extends Vue {
  tags = tagsModel.data;
  tagName = "";
  route = "";
  created() {
    this.route = this.$route.params.id;
    if (this.tags.find(tag => tag.name === this.route)) {
      this.tagName = this.route;
    } else {
      this.$router.replace("/404");
    }
  }
  editLabel() {
    if (this.tagName && this.tagName !== "") {
      const result = tagsModel.update(this.route, this.tagName);
      if (result === "success") this.$router.back();
      else window.alert(result);
    }
  }
  deleteLabel() {
    const result = tagsModel.delete(this.route);
    if (result === "success") this.$router.back();
    else {
      window.alert(result);
    }
  }
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.editLabel {
  .title {
    margin: 0 20px;
    padding-top: 44px;
    height: 88px;
    .link {
      position: fixed;
      top: 44px;
      left: 20px;
      height: 44px;
      font-size: $font-size-m;
      color: $black;
      display: flex;
      align-items: center;
      text-align: center;
      .icon {
        margin-right: 4px;
        height: 12px;
      }
    }
    .titleText {
      font-size: $font-size-l;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .line {
    width: 100vw;
    height: 10px;
    background-color: $light-grey;
  }
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