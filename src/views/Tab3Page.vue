<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar animated placeholder="Search" v-model="searchTerm" />
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="state.loading">
      <div class="center">
        <ion-spinner name="crescent" color="primary" />
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <div class="center" v-if="state.searchResults && state.searchResults.length === 0">
        <ion-label>No Resualts. Please Search Above</ion-label>
      </div>

      <drink-card v-for="drink in state.searchResults" :key="drink.idDrink" :drink="drink" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/vue';
import DrinkCard from '@/components/DrinkCard.vue';
import { reactive, ref, watch } from 'vue';
import axios from 'axios';
import IDrinkDetails from '@/interfaces/IDrinkDetails';

const state = reactive({
  searchResults: [] as IDrinkDetails[],
  loading: false
});
const searchTerm = ref('');

const getSearchResults = async (searchTerm: string) => {
  state.loading = true;
  try {
    const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    state.searchResults = data.drinks || [];
  } catch (error) {
    console.error('Error fetching search results:', error);
  } finally {
    state.loading = false;
  }
};

watch(searchTerm, (newSearchTerm) => {
  if (newSearchTerm) {
    getSearchResults(newSearchTerm);
  } else {
    state.searchResults = [];
  }
});

</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ion-spinner {
  transform: scale(1.5);
}
</style>