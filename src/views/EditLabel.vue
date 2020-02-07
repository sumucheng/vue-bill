<template>
  <div class="editLabel">
    <router-link to="/labels" class="link">
      <Icon name="left" />
      <p>返回</p>
    </router-link>
    <div class="name">
      <input v-model="tagName" placeholder="不超过4个字" />
    </div>
    <div class="buttons">
      <router-link to="/labels">
        <Button text="确 认" type="primary" :handleClick="editLabel" />
      </router-link>
      <router-link to="/labels">
        <Button text="删除标签" type="normal" :handleClick="deleteLabel" />
      </router-link>
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
  tagName = "";
  created() {
    const id = this.$route.params.id;
    const tags = model.state.tags();
    const tag = tags.filter(tag => tag.name === id)[0];
    if (tag) {
    } else {
      this.$router.replace("/404");
    }
  }
  editLabel() {}
  deleteLabel() {}
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