<template>
  <div class="computer">
    <div class="display"></div>
    <div class="board">
      <div class="board-row">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>
          <Icon name="delete" />
        </button>
      </div>
      <div class="board-row">
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
      </div>
      <div class="board-row">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
      </div>
      <div class="board-row">
        <button>.</button>
        <button>0</button>
        <button class="wide">OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["text", "type"]
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.computer {
  background-color: $light-grey;
  padding: 15px;
  position: fixed;
  bottom: 80px;
  width: 100%;
  > .display {
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
        font-size: $font-size-xl;
        font-family: "DINAlternate-Bold";
        color: $black;
        background-color: white;
        height: 50px;
        width: 22%;
        border-radius: $border-radius-m;
        box-shadow: 0 4px 8px 0 rgba(9, 17, 71, 0.05);
        &.wide {
          width: 48%;
          color: white;
          background-color: $orange;
        }
      }
    }
  }
}
</style>