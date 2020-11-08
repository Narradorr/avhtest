<template>
  <div class="structure-page">
    <div class="structure-page__header header">
      <h1 class="header__title">Организационная структура</h1>
    </div>
    <Structure></Structure>
  </div>
</template>

<script>
import Structure from "./Structure.vue";
export default {
  components: { Structure },
  name: "HelloWorld",
  props: {},
  computed: {
    msg() {
      return this.$store.state.message;
    },
  },
  mounted() {
    console.log("hello");
    console.log(this.axios);
  },
};
</script>

<style scoped>
.structure-page__header {
  background-color: #2c3e50;
  padding: 1.5rem 2rem;
}

.header__title {
  margin: 0;
  color: #ffffff;
  font-size: 1.4rem;
}
</style>
