<template>
  <div class="app-container w-screen h-screen flex items-center justify-center">
    <Dropdown msg="Vite + Vue" />
  </div>
</template>

<script>
import Dropdown from "./components/Dropdown.vue";

export default {
  name: "App",
  components: {
    Dropdown,
  },
  setup() {},
};
</script>
<style scoped></style>
