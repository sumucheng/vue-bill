<template>
  <div class="computer">
    <div class="display">{{next || total || "0"}}</div>
    <div class="board">
      <div class="board-row">
        <button @click="clickCalc('1')">1</button>
        <button @click="clickCalc('2')">2</button>
        <button @click="clickCalc('3')">3</button>
        <button @click="clickCalc('delete')">
          <Icon name="delete" />
        </button>
      </div>
      <div class="board-row">
        <button @click="clickCalc('4')">4</button>
        <button @click="clickCalc('5')">5</button>
        <button @click="clickCalc('6')">6</button>
        <button @click="clickCalc('+')">+</button>
      </div>
      <div class="board-row">
        <button @click="clickCalc('7')">7</button>
        <button @click="clickCalc('8')">8</button>
        <button @click="clickCalc('9')">9</button>
        <button @click="clickCalc('-')">-</button>
      </div>
      <div class="board-row">
        <button @click="clickCalc('.')">.</button>
        <button @click="clickCalc('0')">0</button>
        <button v-if="finish" class="wide" @click="submit">OK</button>
        <button v-else class="wide" @click="clickCalc('=')">=</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
const calc = require("./calc.js").default;
@Component
export default class Computer extends Vue {
  total = "";
  next = "";
  operation = "";
  finish = true;
  @Prop() handleSubmit: Function | undefined;
  @Prop() count: number | undefined;
  created() {
    if (this.count) this.next = this.count.toString();
  }

  submit() {
    const amount = Number(this.next || this.total || "0");
    if (amount > 0) {
      this.$emit("update:count", amount);
      this.handleSubmit && this.handleSubmit();
      this.total = "";
      this.next = "";
      this.operation = "";
    }
  }
  clickCalc(buttonName: string) {
    if (buttonName === "+" || buttonName === "-") {
      this.finish = false;
    }
    if (buttonName === "=") this.finish = true;

    const newState = calc(
      {
        total: this.total,
        next: this.next,
        operation: this.operation
      },
      buttonName
    );
    if (newState.total !== undefined) this.total = newState.total;
    if (newState.next !== undefined) this.next = newState.next;
    if (newState.operation !== undefined) this.operation = newState.operation;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.computer {
  font-family: $font-number;
  background-color: $light-grey;
  padding: 15px;
  position: fixed;
  bottom: 0;
  width: 100%;
  > .display {
    @extend %shadow;
    text-align: right;
    height: 70px;
    font-size: $font-size-xxl;
    border-radius: $border-radius-m;
    background-color: white;
    padding: 12px;
  }
  > .board {
    display: flex;
    flex-direction: column;
    > .board-row {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      > button {
        @extend %shadow;
        font-size: $font-size-xl;
        color: $black;
        background-color: white;
        height: 50px;
        width: 22%;
        border-radius: $border-radius-m;
        &.wide {
          width: 48%;
          color: white;
          background-color: $orange;
        }
      }
    }
  }
}
@media (max-height: 735px) {
  .computer {
    > .display {
      height: 60px;
    }
    > .board > .board-row > button {
      height: 40px;
    }
  }
}
@media (min-width: 500px) {
  .computer {
    > .display {
      height: 120px;
    }
    > .board > .board-row {
      margin-top: 20px;
      > button {
        height: 80px;
      }
    }
  }
}
</style>