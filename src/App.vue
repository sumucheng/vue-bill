<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <router-link to="/labels">标签</router-link>|
      <router-link to="/">记录</router-link>|
      <router-link to="/statistics">统计</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
