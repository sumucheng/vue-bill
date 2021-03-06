<template>
  <div>
    <Background />
    <div class="title">
      <div class="wrapper yearAndMonth">
        <div class="year text">{{dateText.year}}年</div>
        <div class="month">
          <Icon name="solid-left" class="left" @click.native="preMonth" />
          {{dateText.month}}月
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
import dayjs from "dayjs";

import Background from "@/components/common/Background.vue";

@Component({
  components: { Background }
})
export default class Header extends Vue {
  @Prop() now!: Date;
  @Prop() headerTitle!: { text: string; count: number }[];
  get date() {
    return dayjs(this.now);
  }
  get dateText() {
    return { year: this.date.year(), month: this.date.format("MM") };
  }
  preMonth() {
    this.$emit("update:now", this.date.subtract(1, "month").toDate());
  }
  nextMonth() {
    this.$emit("update:now", this.date.add(1, "month").toDate());
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

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