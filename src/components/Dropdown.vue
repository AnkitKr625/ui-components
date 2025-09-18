<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Dropdown",
  props: {
    msg: {
      type: String,
      default: "Hello",
    },
  },
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
