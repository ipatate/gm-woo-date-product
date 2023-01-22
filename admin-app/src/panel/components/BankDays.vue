<template>
  <fieldset class="gm-woo-date-fieldset">
    <legend class="gm-woo-date-legend">Jours fériés en {{ year }}</legend>
    <p>
      Les jours sélectionnés sont désactivés dans le choix des dates de retrait
    </p>
    <label class="gm-woo-date-label" v-for="(day, key) in days" :key="day">
      <input
        type="checkbox"
        :checked="store.days.includes(key)"
        :value="key"
        @click="handler"
      />{{ day }} ({{ dateFull(key) }})
    </label>
  </fieldset>
</template>

<script setup>
import { useMainStore } from "../stores";
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
});

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

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
};

const lg =
  document.getElementsByTagName("html")[0].getAttribute("lang") || "fr-FR";

const dateFull = (date) => {
  return new Date(date).toLocaleDateString(lg, options);
};

onMounted(async () => {
  // call api
  const url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${props.year}.json`;
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
