<template>
  <div class="billDetail">
    <Back titleText="详情" />
    <div class="main">
      <div class="buttons">
        <Button text="编 辑" type="primary" />
        <Button text="删 除" type="normal" />
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
export default class EditLabel extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.billDetail {
  .main {
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