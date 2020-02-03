<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
}

html {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
}

body,
html {
  height: 100%;
}

a {
  text-decoration: none;
}
button {
  border-style: none;
}

#app {
  font-family: "PingFangSC-Medium", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}
</style>
