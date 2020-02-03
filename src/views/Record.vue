<template>
  <div>
    <Layout>
      <Header />
      <div class="panel">
        <div>
          <div class="labels">
            <Tag isSelected="true">衣</Tag>
            <Tag>食</Tag>
            <Tag>住</Tag>
            <Tag>行</Tag>
            <Tag>+ 添加标签</Tag>
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
import Header from "@/components/Header.vue";
import Tag from "@/components/Tag.vue";
export default {
  components: { Header, Tag }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

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