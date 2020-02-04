<template>
  <div>
    <Layout>
      <Header />
      <div class="panel">
        <Tabs />
        <Bill v-for="bill in bills" :key="bill" :bill="bill" />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Bill from "@/components/statistics/Bill.vue";
export default {
  components: { Header, Bill, Tabs },
  data() {
    return {
      bills: [
        { type: "expend", count: 100, time: "", label: "餐饮" },
        { type: "income", count: 3000, time: "", label: "工资" },
        { type: "expend", count: 10, time: "", label: "交通", note: "地铁" }
      ]
    };
  }
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
  padding-left: 20px;
  padding-right: 20px;
}
</style>