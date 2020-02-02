<template>
  <div>
    <Layout>
      <div>
        <img src="../assets/background.png" class="background" />
        <div class="type">
          <a>支出</a>
          <a>收入</a>
        </div>
      </div>
      <div class="panel">
        <div>
          <div class="labels">
            <button>衣</button>
            <button>食</button>
            <button>住</button>
            <button>行</button>
            <button>+ 添加标签</button>
          </div>
          <div class="note">
            <input type="text" />
          </div>
        </div>
        <div class="computer">
          <div class="display"></div>
          <div class="board">
            <div class="board-row">
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>x</button>
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
              <button>ok</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.type {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  margin-top: 44px;
  margin-bottom: 20px;
  > a {
    font-size: $font-size-l;
    color: white;
  }
}
.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .labels {
    margin: 20px;
    margin-bottom: 0px;
    display: flex;
    flex-wrap: wrap;
    > button {
      font-size: $font-size-l;
      padding-left: 15px;
      padding-right: 15px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .note {
    height: 120px;
    background-color: $light-grey;
    border-radius: $border-radius-m;
    margin: 20px;
    margin-top: 0px;
    > input {
      margin: 20px;
    }
  }
  > .computer {
    background-color: $light-grey;
    padding: 15px;
    > .display {
      height: 80px;
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
        margin-top: 8px;
        > button {
          height: 55px;
          width: 23%;
        }
      }
    }
  }
}
</style>