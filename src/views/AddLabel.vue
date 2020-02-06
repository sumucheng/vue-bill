<template>
  <div>
    <router-link to="/labels" class="link">
      <Icon name="left" />
      <p>返回</p>
    </router-link>
    <div class="name">
      <input v-model="name" placeholder="不超过4个字" />
    </div>
    <div class="buttons">
      <router-link to="/labels">
        <Button text="确 认" type="primary" @click="addLabel" />
      </router-link>
      <router-link to="/labels">
        <Button text="删除标签" type="normal" @click="deleteLabel" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Button }
})
export default class AddLabel extends Vue {
  addLabel() {}
  deleteLabel() {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.link {
  margin-top: 24px;
  margin-left: 20px;
  font-size: $font-size-m;
  height: 44px;
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
</style>