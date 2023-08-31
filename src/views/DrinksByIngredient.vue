<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ ingredient }} Drinks</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="state.loading">
            <div class="loading-center">
                <ion-spinner name="crescent" color="primary" />
            </div>
        </ion-content>

        <ion-content :fullscreen="true" v-else>
            <ion-list>
                <ion-item v-for="drink in state.drinks" :key="drink.idDrink"
                    @click="router.push({ name: 'Drink', params: { id: drink.idDrink } })">
                    <ion-thumbnail slot="start">
                        <img :src="drink.strDrinkThumb" />
                    </ion-thumbnail>
                    <ion-label>{{ drink.strDrink }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonSpinner, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/vue';
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';
import IDrink from '@/interfaces/IDrink';

const ingredient = router.currentRoute.value.params.ingredient;

const state = reactive({
    drinks: [] as IDrink[],
    loading: false
});

const getDrinksByIngredient = async () => {
    state.loading = true;
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        state.drinks = response.data.drinks;
        state.loading = false;
    } catch (error) {
        console.log(error);
        state.loading = false;
    }
};

getDrinksByIngredient();
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
  