<template>
  <div class="computer">
    <div class="display">123</div>
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
  font-family: $font-number;
  background-color: $light-grey;
  padding: 15px;
  position: fixed;
  bottom: 80px;
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