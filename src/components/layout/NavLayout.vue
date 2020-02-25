<template>
  <div class="wrapper">
    <div class="main">
      <slot />
    </div>
    <nav>
      <router-link v-for="link in links" :key="link.name" :to="`/${link.name}`" class="routerLink">
        <Icon v-if="$route.path.match(link.name)" :name="`${link.name}-selected`" />
        <Icon v-else :name="link.name" :class="link.name" />
        <p>{{link.text}}</p>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class NavLayout extends Vue {
  links = [
    { name: "statistics", text: "统计" },
    { name: "record", text: "" },
    { name: "setting", text: "设置" }
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.wrapper {
  height: 100vh;
  .main {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 81px;
    background-color: $light-grey;
    width: 100%;
  }
  nav {
    border-top: 1px solid $border-grey;
    padding-top: 8px;
    padding-bottom: 20px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 80px;
    > .routerLink {
      width: 33.33333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > .icon {
        width: 32px;
        height: 32px;
        margin-bottom: 3px;
        &.record {
          position: absolute;
          width: 80px;
          height: 80px;
          top: -10px;
        }
      }
      > p {
        color: $grey;
        margin: 0;
      }
      &.router-link-active > p {
        color: $blue;
      }
    }
  }
}
@media (min-width: 500px) {
  .wrapper {
    nav,
    .main {
      width: 500px;
    }
  }
}
</style>