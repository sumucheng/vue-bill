<template>
  <div class="panel">
    <Icon name="notFound" />
    <router-link to="/record" class="return">
      <Button text="返回" type="primary"></Button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Button }
})
export default class NotFount extends Vue {}
</script>

<style lang="scss" scoped>
.panel {
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .icon {
    width: 211px;
    height: 166px;
    align-self: center;
  }
  .return {
    margin: 20px;
  }
}
</style>