<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ state.drink.strDrink }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="state.loading">
            <div class="loading-center">
                <ion-spinner name="crescent" color="primary" />
            </div>
        </ion-content>

        <ion-content :fullscreen="true" v-else>
            <drink-card :drink="state.drink" />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonSpinner } from '@ionic/vue';
import DrinkCard from '@/components/DrinkCard.vue';
import { reactive } from 'vue';
import router from '@/router';
import axios from 'axios';
import IDrinkDetails from '@/interfaces/IDrinkDetails';

const id = router.currentRoute.value.params.id;

const state = reactive({
    drink: {} as IDrinkDetails,
    loading: false
});

const getDrinkById = async () => {
    state.loading = true;
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        state.drink = response.data.drinks[0];
        state.loading = false;
    } catch (error) {
        console.log(error);
        state.loading = false;
    }
};

getDrinkById();
</script>

<style></style>