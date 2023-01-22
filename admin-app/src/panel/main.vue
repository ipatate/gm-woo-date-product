<template>
  <div class="gm-woo-date-admin-panel wrap">
    <h1>Réglages des dates de retrait pour les produits</h1>
    <Processing />
    <ClosedDays />
    <div class="gm-woo-date-bank">
      <BankDays />
      <BankDays :year="new Date().getFullYear() + 1" />
    </div>
    <Holidays />
    <button
      @click="store.saveOptions"
      :disabled="store.loading"
      class="button button-primary"
    >
      <span v-if="store.loading === true">processing...</span>
      <span v-else> Sauver </span>
    </button>
    <div v-show="store.loading === true" class="gm-woo-date-loader">
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./stores";
import BankDays from "./components/BankDays.vue";
import Processing from "./components/Processing.vue";
import ClosedDays from "./components/ClosedDays.vue";
import Holidays from "./components/Holidays.vue";
import Loader from "./components/Loader.vue";
const store = useMainStore();
</script>

<style>
.gm-woo-date-h1 {
  margin-bottom: 2rem;
}

.gm-woo-date-admin-panel {
  margin-top: 2rem;
  padding: 1rem 0.5rem;
  position: relative;
}

.gm-woo-date-bank {
  display: flex;
  flex-wrap: wrap;
}

.gm-woo-date-bank > fieldset:last-child {
  margin-left: 6rem;
}

.gm-woo-date-legend {
  font-size: 1.3rem;
}

.gm-woo-date-fieldset {
  display: flex;
  flex-direction: column;
  padding: 1rem 0 3rem;
  margin-top: 1rem;
}

.gm-woo-date-label {
  margin: 0.3rem 0;
}

.gm-woo-date-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(240, 240, 241, 0.4);
  color: var(--wc-blue);
}
</style>
