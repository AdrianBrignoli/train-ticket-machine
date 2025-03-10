<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStationStore } from '@/stores/stationStore';
import { onMounted } from 'vue';

const router = useRouter();
const store = useStationStore();

function handlePurchase() {  
  store.setSelectedStation(null);
  store.setSearchTerm('');
  store.setSearchResults({ filtered: [], characters: [] });
  
  router.push({ name: 'home' });
}

onMounted(() => {
  if (!store.selectedStation) {
    router.replace({ name: 'home' });
  }
});
</script>

<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <div v-if="store.selectedStation" class="checkout__details">
      <h2>Selected Destination:</h2>
      <div class="checkout__station">
        <span class="checkout__station-name">
          {{ store.selectedStation.stationName }}
        </span>
        <span class="checkout__station-code">
          ({{ store.selectedStation.stationCode }})
        </span>
      </div>
      <button 
        class="checkout__purchase-button"
        @click="handlePurchase"
      >
        Complete Purchase
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  
  &__details {
    margin-top: 2rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &__station {
    margin: 1rem 0;
    padding: 1rem;
    background: white;
    border-radius: 4px;
    border-left: 4px solid #007bff;
  }
  
  &__station-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
  }
  
  &__station-code {
    margin-left: 0.5rem;
    color: #6c757d;
  }
  
  &__purchase-button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  
    &:hover {
      background: #218838;
    }
  }
}
</style> 