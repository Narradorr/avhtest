<template>
  <div class="seed-wrapper" :style="cssVars">
    <div class="seed" :class="['nested_' + nesting_order]">
      <div class="seed__cell seed__name" :style="padding_left">
        <span class="show_name" v-if="is_editing">
          <input type="text" v-model="new_seed_name" />
        </span>
        <span v-else>
          {{ seed.name }}
        </span>

        <div
          v-if="seed.children && seed.children.length > 0"
          @click="is_show_children = !is_show_children"
          class="icon-wrapper"
          title="Показать / Скрыть внутренние элементы"
        >
          <img 
            :class="{ opened: is_show_children }"
            class="icon show-children-icon"
            src="../assets/imgs/svg/angle-arrow-down.svg"
            alt=""
          />
        </div>
      </div>
      <div class="seed__cell seed__count">
        <span> {{ count }} </span>
      </div>

      <div class="seed__cell seed__actions">
        <div class="icon-wrapper" @click="onEdit" title="Редактировать">
          <img class="icon" src="../assets/imgs/svg/edit.svg" alt="" />
        </div>

        <div class="icon-wrapper" @click="onRemove" title="Удалить">
          <img class="icon" src="../assets/imgs/svg/delete.svg" alt="" />
        </div>
        <div
          class="icon-wrapper"
          @click="isChanged"
          title="Сохранить изменения"
        >
          <img class="icon" src="../assets/imgs/svg/done.svg" alt="" />
        </div>
      </div>
    </div>

    <seed
      class="child"
      :class="{ hidden: !is_show_children }"
      v-for="(item, index) in seed.children"
      :key="'seed' + seed.name + item.name"
      :seed="item"
      :seed_index="index"
      :nesting_order="nesting_order + 1"
      @myEvent="childRemoved"
      @calcNewCount="recalcCount"
    ></seed>
  </div>
</template>

<script>
export default {
  name: "Seed",
  props: {
    seed: Object,
    seed_index: Number,
    nesting_order: Number,
  },
  data() {
    return {
      count: 0,
      prev_count: 0,
      is_editing: false,
      new_seed_name: this.seed.name,
      is_show_children: true,
    };
  },
  computed: {
    bg_color() {
      return {
        "background-color":
          "rgba(31, 117, 205," + (this.nesting_order - 1) * 15 + "%)",
      };
    },
    padding_left() {
      return {
        "padding-left": this.nesting_order * 20 + "px",
      };
    },
    cssVars() {
      return {
        "--sec-color":
          "rgba(31, 117, 205," + (this.nesting_order - 1) * 15 + "%)",
      };
    },
  },
  methods: {
    recalcCount() {
      this.seed.count = 0;
      this.calcCount();
    },
    calcCount() {
      this.count = 0;
      if (this.seed.children && this.seed.children.length > 0) {
        this.seed.children.forEach((el) => {
          this.count += el.count;
        });
      } else {
        this.count = this.seed.count;
      }
      this.seed.count = this.count;

      this.$emit("calcNewCount");
    },
    onEdit() {
      this.is_editing = true;
    },
    childRemoved(e) {
      console.log("e => ", e);
      this.seed.children.splice(e, 1);
      this.recalcCount();
    },
    onRemove() {
      console.log(' remove ', this.seed_index );
      this.$emit("myEvent", this.seed_index);
    },
    isChanged() {
      console.log(this.seed.name);
      this.seed.name = this.new_seed_name;
      this.is_editing = false;
    },
  },
  created() {
    this.calcCount();
  },
};
</script>

<style scoped>
@import "../assets/css/seed.css";
.child {
}

.child.hidden {
  display: none;
}
</style>
