<template>
  <fieldset>
    <legend>Nombre de jours de traitement</legend>
    <label>
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
legend {
  font-size: 1.3rem;
}

fieldset {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 3rem;
  margin-top: 3rem;
}
label {
  margin: 0.3rem 0;
}
</style>
