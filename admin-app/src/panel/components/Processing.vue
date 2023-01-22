<template>
  <fieldset class="gm-woo-date-fieldset">
    <legend class="gm-woo-date-legend">Nombre de jours de traitement</legend>
    <label class="gm-woo-date-label">
      Nombre de jours entre la commande et le retrait.
      <select v-model="store.processing">
        <option v-for="day of [1, 2, 3, 4, 5, 6, 7]" :key="day" :value="day">
          {{ day }}
        </option>
      </select>
    </label>
  </fieldset>
</template>

<script setup>
import { useMainStore } from "../stores";

const store = useMainStore();
</script>

<style scoped>
fieldset {
  margin-top: 3rem;
}
</style>
