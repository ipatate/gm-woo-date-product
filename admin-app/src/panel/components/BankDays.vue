<template>
  <fieldset>
    <legend>Jours fériés en {{ new Date().getFullYear() }}</legend>
    <p>
      Les jours sélectionnés sont désactivés dans le choix des dates de retrait
    </p>
    <label v-for="(day, key) in days" :key="day">
      <input
        type="checkbox"
        :checked="store.days.includes(key)"
        :value="key"
        @click="handler"
      />{{ day }}({{ key }})
    </label>
  </fieldset>
</template>

<script setup>
import { useMainStore } from "../stores";
import { onMounted, ref } from "vue";

const store = useMainStore();
// bank days
const days = ref({});

const handler = (event) => {
  if (event.currentTarget.checked === true) {
    store.addDays(event.currentTarget.value);
  } else {
    store.removeDay(event.currentTarget.value);
  }
};

onMounted(async () => {
  // call api
  const url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${new Date().getFullYear()}.json`;
  const response = await fetch(url);
  const jsonResponse = await response.json();
  // add all dates in store
  if (store.isFirstTime) {
    const dt = [];
    Object.keys(jsonResponse).forEach((key) => {
      if (store.days.includes(key) === false) {
        // maybe formate date after
        dt.push(key);
      }
      store.addDays(dt);
    });
  }
  days.value = jsonResponse;
});
</script>

<style scoped>
legend {
  font-size: 1.3rem;
}

fieldset {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 2rem;
}
label {
  margin: 0.3rem 0;
}
</style>
