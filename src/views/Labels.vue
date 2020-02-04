<template>
  <Layout>
    <div class="labels-wrapper">
      <div class="labels">
        <Label v-for="label in labels" :key="label">{{label}}</Label>
      </div>
      <Button text="新建标签" type="primary">
        <router-link to="/addLabels"></router-link>
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
export default {
  components: { Button, Label },
  data() {
    return {
      labels: ["餐饮", "娱乐", "服饰", "交通"]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";

.labels-wrapper {
  margin-top: 64px;
  margin-left: 20px;
  margin-right: 20px;
  .labels {
    margin-bottom: 40px;
  }
}
</style>