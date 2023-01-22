<template>
  <fieldset class="gm-woo-date-fieldset">
    <legend class="gm-woo-date-legend">Jours de fermeture</legend>
    <p>
      Les jours selectionnés sont desactivés dans le choix des dates de retrait
    </p>
    <label class="gm-woo-date-label" v-for="(day, key) in days" :key="day">
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
