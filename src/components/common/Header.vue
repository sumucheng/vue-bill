<template>
  <div>
    <Background />
    <div class="type">
      <div class="wrapper" :class="{active:type==='expend'}" @click="$emit('update:type','expend')">
        <a>支出</a>
        <div class="dot"></div>
      </div>
      <div class="wrapper" :class="{active:type==='income'}" @click="$emit('update:type','income')">
        <a>收入</a>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Background from "@/components/common/Background.vue";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: { Background }
})
export default class Header extends Vue {
  @Prop(String) type: string | undefined;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.type {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  margin-top: 44px;
  margin-bottom: 20px;
  > .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 37px;
    > a {
      font-size: $font-size-l;
      color: white;
      opacity: 0.7;
    }
    > .dot {
      height: 5px;
      width: 5px;
      margin-top: 8px;
      border-radius: 50%;
      background-color: white;
      display: none;
    }
  }
  > .active {
    > a {
      opacity: 1;
    }
    > .dot {
      display: block;
    }
  }
}
</style>