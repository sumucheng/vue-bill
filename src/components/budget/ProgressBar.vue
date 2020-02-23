<template>
  <div class="progressBar">
    <div class="percentLine">
      <div class="use" :style="`width: ${expend/budget*100}%;max-width:100%`"></div>
      <div class="line" :style="`left: ${now.getDate()/endDate*100}%`"></div>
    </div>
    <div class="date">
      <div class="startDate">{{now.getMonth()+1}}月1日</div>
      <div class="endDate">{{endDate}}日</div>
    </div>
    <Icon name="scale" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class ProgressBar extends Vue {
  @Prop({ default: new Date() }) now!: Date;
  @Prop({ default: 0 }) endDate!: number;
  @Prop({ default: 0 }) expend!: number;
  @Prop({ default: 0 }) budget!: number;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.progressBar {
  border-bottom: 1px solid $border-grey;
  .icon {
    width: 100%;
    height: 10px;
  }
  .percentLine {
    height: 20px;
    margin: 0 20px;
    background-color: $light-yellow;
    position: relative;
    border-radius: $border-radius-m;
    .use {
      border-radius: $border-radius-m;
      height: 20px;
      background-image: linear-gradient(141deg, #ff8700 0%, #ffce4c 100%);
      position: absolute;
      top: 0;
      left: 0;
    }
    .line {
      height: 20px;
      width: 1px;
      background-color: $orange;
      position: absolute;
      top: 0;
      .day {
        position: absolute;
        top: 35px;
        left: -20px;
        width: 40px;
        color: $orange;
      }
    }
  }
  .date {
    display: flex;
    justify-content: space-between;
    margin: 5px 20px 2px 20px;
    color: $grey;
    position: relative;
    .nowDate {
      color: $orange;
      position: absolute;
    }
  }
}
</style>