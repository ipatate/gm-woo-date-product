<template>
  <fieldset>
    <legend>Jours de fermeture</legend>
    <p>
      Les jours selectionnés sont desactivés dans le choix des dates de retrait
    </p>
    <label v-for="(day, key) in days" :key="day">
      <input type="checkbox" :value="key + 1" v-model="store.daysClosed" />{{
        day
      }}
    </label>
  </fieldset>
</template>

<script setup>
import { useMainStore } from "../stores";
import { ref } from "vue";

const store = useMainStore();
// days
const days = ref([
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
]);
</script>

<style scoped>
legend {
  font-size: 1.3rem;
}

fieldset {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 3rem;
}
label {
  margin: 0.3rem 0;
}
</style>
