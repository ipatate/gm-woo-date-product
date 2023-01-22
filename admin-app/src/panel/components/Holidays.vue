<template>
  <fieldset class="gm-woo-date-fieldset">
    <legend class="gm-woo-date-legend">Périodes de fermeture</legend>
    <div>
      <div>
        <button @click="store.addHoliday" class="button">
          Ajouter une période
        </button>
      </div>
      <ul>
        <li v-for="holiday in store.holidays" :key="holiday.id">
          <label class="gm-woo-date-label"
            >De
            <input
              type="date"
              :value="holiday.start"
              @input="(e) => store.handlerDate('start', e, holiday.id)"
            />
          </label>
          &#160;&#160;
          <label class="gm-woo-date-label"
            >à
            <input
              type="date"
              :value="holiday.end"
              :min="holiday.start || null"
              @input="(e) => store.handlerDate('end', e, holiday.id)"
            />
          </label>
          <button @click="store.removeHoliday(holiday.id)" class="button">
            Supprimer
          </button>
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<script setup>
import { useMainStore } from "../stores";
const store = useMainStore();
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  border: 1px solid #999;
  background-color: #f7f7f7;
  padding: 0.5rem;
  border-radius: 4px;
}

li button.button {
  display: block;
  margin-left: auto;
}
</style>
