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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import DrinkCard from '@/components/DrinkCard.vue';
import { reactive } from 'vue';
import router from '@/router';
import axios from 'axios';

interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string;
    strDrinkES: string;
    strDrinkDE: string;
    strDrinkFR: string;
    "strDrinkZH-HANS": string;
    "strDrinkZH-HANT": string;
    strTags: string;
    strVideo: string;
    strCategory: string;
    strIBA: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsES: string;
    strInstructionsDE: string;
    strInstructionsFR: string;
    "strInstructionsZH-HANS": string;
    "strInstructionsZH-HANT": string;
    strDrinkThumb: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strCreativeCommonsConfirmed: string;
    dateModified: string;
}

const id = router.currentRoute.value.params.id;

const state = reactive({
    drink: {} as Drink,
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