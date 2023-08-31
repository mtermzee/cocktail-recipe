<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search By Ingredient</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner name="crescent" color="primary" />
      </div>
    </ion-content>

    <ion-content :fullscreen="true" v-else>
      <ion-list>
        <ion-item v-for="ingredient in state.ingredients" :key="ingredient.strIngredient1"
          @click="router.push({ name: 'DrinksByIngredient', params: { ingredient: ingredient.strIngredient1 } })">
          <ion-thumbnail slot="start">
            <img :src="ingredientImage(ingredient.strIngredient1)" />
          </ion-thumbnail>
          <ion-label>{{ ingredient.strIngredient1 }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/vue';
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';
import IIngredient from '@/interfaces/IIngredient';

const state = reactive({
  ingredients: [] as IIngredient[],
  loading: false
});

const getIngredients = async () => {
  state.loading = true;
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    state.ingredients = response.data.drinks;
    state.loading = false;
  } catch (error) {
    console.log(error);
    state.loading = false;
  }
};

const ingredientImage = (ingredient: string) => {
  return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
};

getIngredients();
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
