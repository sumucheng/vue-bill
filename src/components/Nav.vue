<template>
  <nav>
    <router-link to="/statistics" class="routerLink" active-class="selected">
      <Icon v-if="$route.path.match('statistics')" name="statistics-selected" />
      <Icon v-else name="statistics" />
      <p>统计</p>
    </router-link>
    <router-link to="/record" class="routerLink" active-class="selected">
      <Icon v-if="$route.path.match('record')" name="record-selected" />
      <Icon v-else name="record" />
      <p>记一笔</p>
    </router-link>
    <router-link to="/labels" class="routerLink" active-class="selected">
      <Icon v-if="$route.path.match('labels')" name="labels-selected" />
      <Icon v-else name="labels" />
      <p>标签</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
nav {
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
      font-family: $font-family;
      color: $grey;
      margin: 0;
    }
  }
  .routerLink.selected > p {
    color: $blue;
  }
}
</style>