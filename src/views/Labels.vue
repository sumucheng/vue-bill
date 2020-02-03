<template>
  <div class="labels-wrapper">
    <Layout>
      <div class="labels">
        <Label v-for="label in labels" :key="label">{{label}}</Label>
      </div>
      <Button text="新建标签" type="primary" />
    </Layout>
  </div>
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
.labels-wrapper {
  margin-top: 64px;
  margin-left: 20px;
  margin-right: 20px;
  .labels {
    margin-bottom: 40px;
  }
}
</style>