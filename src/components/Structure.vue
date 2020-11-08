<template>
  <div class="structure-wrapper">
    <button @click="addSeed()">Add</button>
    <div class="structure" v-if="structure">
      <div class=" seed__header">
        <div class="seed__cell seed__name"></div>
        <div class="seed__cell seed__count">Общее количество</div>
        <div class="seed__cell seed__actions">Действия</div>
      </div>
      <Seed
        v-for="(item, index) in structure"
        :key="'seed' + index"
        :seed="item"
        :seed_index="index"
        :nesting_order="1"
        @myEvent="childRemoved"
      ></Seed>
    </div>
    <div class="no-data" v-else>Данных нет</div>
  </div>
</template>

<script>
import Seed from "./Seed.vue";
// import styles from '../assets/css/seed.css'


export default {
  components: { Seed },
  name: "Structure",
  props: {},
  computed: {
    structure() {
      return this.$store.state.structure;
    },
  },
  methods: {
    addSeed() {
      console.log("adding seed");
    },
    childRemoved(e) {
      console.log(e);
      this.structure.splice(e, 1);
    },
  },
  async created() {
    await this.$store.dispatch("getStructure");
  },
};
</script>

<style scoped>
@import '../assets/css/seed.css';
.structure {
  text-align: left;
  /* width: 66%;
  margin: 0 auto; */
  margin-bottom: 200px;
}
</style>
