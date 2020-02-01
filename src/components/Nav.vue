<template>
  <nav>
    <router-link to="/statistics" class="routerLink">
      <Icon name="statistics" />
      <p>统计</p>
    </router-link>
    <router-link to="/record" class="routerLink">
      <Icon name="record" />
      <p>记一笔</p>
    </router-link>
    <router-link to="/labels" class="routerLink">
      <Icon name="labels" />
      <p>标签</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding-top: 8px;
  padding-bottom: 21px;
  display: flex;
  font-size: 12px;
  background: #fff;
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
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      color: #292b55;
      margin: 0;
    }
  }
}
</style>