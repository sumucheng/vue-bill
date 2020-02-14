<template>
  <Layout>
    <Detail v-if="initSelected==='detail'" :initSelected.sync="initSelected" :initNow.sync="now" />
    <Category v-else :initSelected.sync="initSelected" :initNow.sync="now" />
  </Layout>
</template>

<script lang="ts">
import Category from "./Category.vue";
import Detail from "./Detail.vue";

import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { Category, Detail }
})
export default class Statistics extends Vue {
  now = new Date();
  initSelected = "detail";
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
</style>