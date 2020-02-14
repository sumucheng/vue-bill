<template>
  <nav>
    <router-link
      v-for="link in links"
      :key="link.name"
      :to="`/${link.name}`"
      class="routerLink"
      :class="{selected:$route.path.match(link.name)}"
    >
      <Icon v-if="$route.path.match(link.name)" :name="`${link.name}-selected`" />
      <Icon v-else :name="link.name" />
      <p>{{link.text}}</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Nav extends Vue {
  links = [
    { name: "statistics", text: "统计", link: "/statistics" },
    { name: "record", text: "记一笔", link: "/record" },
    { name: "labels", text: "标签", link: "/labels" }
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
nav {
  border-top: 1px solid $border-grey;
  padding-top: 8px;
  padding-bottom: 21px;
  display: flex;
  font-size: $font-size-s;
  background: #fff;
  position: absolute;
  bottom: 0;
  z-index: 5;
  width: 100%;
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
    }
    > p {
      color: $grey;
      margin: 0;
    }
  }
  .routerLink.selected > p {
    color: $blue;
  }
}
</style>