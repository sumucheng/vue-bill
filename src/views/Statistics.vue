<template>
  <div>
    <Layout>
      <Header />
      <Bill v-for="bill in bills" :key="bill" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Bill from "@/components/Bill.vue";
export default {
  components: { Header, Bill },
  data() {
    return {
      bills: [
        { type: "expend", count: 100, time: "", label: "餐饮" },
        { type: "expend", count: 100, time: "", label: "餐饮" },
        { type: "expend", count: 100, time: "", label: "餐饮" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>