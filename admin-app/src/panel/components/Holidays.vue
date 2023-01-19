<template>
  <fieldset>
    <legend>Périodes de fermeture</legend>
    <div>
      <div>
        <button @click="store.addHoliday" class="button">
          Ajouter une période
        </button>
      </div>
      <ul>
        <li v-for="holiday in store.holidays" :key="holiday.id">
          <label
            >De
            <input
              type="date"
              :value="holiday.start"
              @input="(e) => store.handlerDate('start', e, holiday.id)"
            />
          </label>
          &#160;&#160;
          <label
            >à
            <input
              type="date"
              :value="holiday.end"
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
