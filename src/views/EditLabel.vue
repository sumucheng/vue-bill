<template>
  <HeaderLayout titleText="编辑标签">
    <div class="name">
      <input v-model="newName" placeholder="不超过4个字" required maxlength="4" />
    </div>
    <div class="buttons">
      <Button text="确 认" type="primary" @click.native="editLabel" />
      <Button text="删除标签" type="normal" @click.native="deleteLabel" />
    </div>
  </HeaderLayout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class EditLabel extends Vue {
  tag: Tag | undefined;
  newName = "";
  created() {
    this.tag = this.$store.getters.findTag(this.$route.params.id);
    if (this.tag) this.newName = this.tag.name;
    else this.$router.replace("/404");
  }
  editLabel() {
    if (this.newName && this.newName.trim() !== "") {
      if (this.tag!.name === this.newName) this.$router.back();
      else if (this.$store.getters.findTag(this.newName))
        window.alert("标签名重复");
      else {
        this.$store.commit("editTag", {
          tag: this.tag,
          newName: this.newName
        });
        this.$router.back();
      }
    }
  }
  deleteLabel() {
    if (name === "一般" || name === "工资") window.alert("该标签不可删除");
    else {
      this.$store.commit("deleteTag", this.tag);
      this.$router.back();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

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
</style>