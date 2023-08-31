<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Random Cocktail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner name="crescent" color="primary" />
      </div>
    </ion-content>

    <ion-content :fullscreen="true" v-else>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)" pullFactor="0.8" pullMin="60" pullMax="120">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <drink-card :drink="state.randomCocktail" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import DrinkCard from '@/components/DrinkCard.vue';
import { reactive } from 'vue';
import axios from 'axios';

const state = reactive({
  randomCocktail: {},
  loading: false,
})

const getRandomCocktail = async () => {
  state.loading = true;
  const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  console.log(response.data.drinks[0]);
  state.randomCocktail = response.data.drinks[0];
  state.loading = false;
}

const doRefresh = (event: CustomEvent) => {
  getRandomCocktail();

  setTimeout(() => {
    event.detail.complete();
  }, 2000);
}

getRandomCocktail();
</script>

<style>
.loading-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ion-spinner {
  transform: scale(1.5);
}
</style>
