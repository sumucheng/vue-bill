<template>
  <Layout :handleExpend="displayExpend" :handleIncome="displayIncome">
    <div class="labels-wrapper">
      <div class="labels">
        <Label v-for="label in displayLabels" :key="label.name">{{label.name}}</Label>
      </div>
      <router-link to="/addLabel">
        <Button text="新建标签" type="primary" class="add"></Button>
      </router-link>
    </div>
  </Layout>
</template>

<script lang="ts">
import Button from "@/components/labels/Button.vue";
import Label from "@/components/labels/Label.vue";
export default {
  components: { Button, Label },
  data() {
    return {
      labels: [
        { type: "expend", name: "餐饮" },
        { type: "expend", name: "娱乐" },
        { type: "expend", name: "服饰" },
        { type: "expend", name: "交通" },
        { type: "income", name: "工资" },
        { type: "income", name: "理财" },
        { type: "income", name: "其他" }
      ],
      displayLabels: [{}]
    };
  },

  methods: {
    displayExpend() {
      this.displayLabels = this.labels.filter(el => el.type === "expend");
    },
    displayIncome() {
      this.displayLabels = this.labels.filter(el => el.type === "income");
    }
  },
  created: function() {
    this.displayExpend();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.labels-wrapper {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  .labels {
    overflow: auto;
    max-height: 500px;
  }
  .add {
    margin-top: 20px;
  }
}
</style>