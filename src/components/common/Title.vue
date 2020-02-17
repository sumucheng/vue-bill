<template>
  <div>
    <img src="@/assets/background.png" class="background" />
    <div class="title">
      <div class="wrapper yearAndMonth">
        <div class="year text">{{year}}年</div>
        <div class="month">
          <Icon name="solid-left" class="left" @click.native="preMonth" />
          {{monthText}}月
          <Icon name="solid-right" class="right" @click.native="nextMonth" />
        </div>
      </div>
      <div class="dotLine"></div>
      <div class="wrapper" v-for="title in headerTitle" :key="title.text">
        <div class="text">{{title.text}}</div>
        <div class="sum">{{title.count}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() now!: Date;
  @Prop() headerTitle!: { text: string; count: number }[];
  get year() {
    return this.now.getFullYear();
  }
  get month() {
    return this.now.getMonth();
  }
  get monthText() {
    return this.month < 9 ? "0" + (this.month + 1) : this.month + 1;
  }
  preMonth() {
    this.$emit("update:now", new Date(this.now.setMonth(this.month - 1)));
  }
  nextMonth() {
    this.$emit("update:now", new Date(this.now.setMonth(this.month + 1)));
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.title {
  position: absolute;
  display: flex;
  width: 100%;
  height: 80px;
  margin-top: 44px;
  margin-bottom: 20px;
  color: white;
  .wrapper {
    width: 33%;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .text {
      font-size: $font-size-s;
      opacity: 0.7;
      margin-bottom: 8px;
    }
    .sum,
    .month {
      font-size: $font-size-l;
      height: 26px;
      display: flex;
      align-items: flex-end;
    }
    .month {
      position: relative;
      .icon {
        height: 12px;
        width: 12px;
        position: absolute;
        &.left {
          left: -15px;
          bottom: 5px;
        }
        &.right {
          right: -15px;
          bottom: 5px;
        }
      }
    }
  }
  .yearAndMonth {
    width: 28%;
    padding-left: 30px;
  }
  .dotLine {
    margin-top: 4px;
    height: 45px;
    border-right: 1px dotted rgba($color: white, $alpha: 0.6);
  }
}
</style>