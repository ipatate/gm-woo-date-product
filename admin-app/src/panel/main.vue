<template>
  <div class="admin-panel wrap">
    <h1>Réglages des dates de retrait pour les produits</h1>
    <Processing />
    <ClosedDays />
    <div class="bank">
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
  </div>
</template>

<script setup>
import { useMainStore } from "./stores";
import BankDays from "./components/BankDays.vue";
import Processing from "./components/Processing.vue";
import ClosedDays from "./components/ClosedDays.vue";
import Holidays from "./components/Holidays.vue";
const store = useMainStore();
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
.admin-panel {
  margin-top: 2rem;
}

.bank {
  display: flex;
  flex-wrap: wrap;
}
.bank > fieldset:last-child {
  margin-left: 6rem;
}
</style>
