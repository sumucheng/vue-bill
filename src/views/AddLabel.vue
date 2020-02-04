<template>
  <div>
    <div class="return">
      <router-link to="/labels" class="link">返回</router-link>
    </div>

    <div class="name">
      <input v-model="name" placeholder="不超过4个字" />
    </div>
    <div class="buttons">
      <Button text="确认" type="primary" />
      <Button text="删除标签" type="normal" />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
export default {
  components: { Button },
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.return {
  margin-top: 44px;
  height: 44px;
  display: flex;
  margin-left: 20px;
  .link {
    font-size: $font-size-m;
    color: $black;
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
  button {
    margin-bottom: 10px;
  }
}
</style>