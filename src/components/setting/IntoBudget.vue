<template>
  <router-link to="/budget">
    <div class="total">
      <div class="top">
        <div class="title">本月预算</div>
        <Icon name="right" />
      </div>
      <div class="content">
        <div
          class="item"
          v-for="list in lists"
          :key="list.text"
          :class="{active:list.text==='剩余预算'}"
        >
          <div class="text">{{list.text}}</div>
          <div class="sum">{{list.count}}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  components: {}
})
export default class TotalBill extends Vue {
  now = new Date();
  monthSum = this.$store.getters.oneMonthSum(this.now);
  get lists() {
    const budget = this.$store.state.budget;
    const expend = this.monthSum ? this.monthSum.expend : 0;
    const rest = budget - expend > 0 ? budget - expend : 0;
    return [
      { text: "总预算", count: budget },
      { text: "本月支出", count: expend },
      { text: "剩余预算", count: rest }
    ];
  }
  created() {
    this.$store.commit("fetch");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.total {
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
  background-color: white;
  border-radius: $border-radius-s;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .title {
      font-size: $font-size-m;
    }
  }
  .content {
    display: flex;
    .item {
      width: 33%;
      display: flex;
      flex-direction: column;
      .text {
        display: flex;
        color: $grey;
        margin-bottom: 5px;
      }
      .sum {
        display: flex;
        font-family: $font-number;
        font-size: $font-size-m;
      }
      &.active {
        .sum {
          font-weight: bold;
          color: $orange;
        }
      }
    }
  }
}
</style>