<template>
    <ion-card>
        <img :src="drink.strDrinkThumb">
        <ion-card-header>
            <ion-card-subtitle>
                {{ drink.strCategory }} | Served In
                {{ drink.strGlass }}
            </ion-card-subtitle>
            <ion-card-title>{{ drink.strDrink }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <p>{{ drink.strInstructions }}</p>
            <ion-list-header>
                <ion-label>Ingredients</ion-label>
                <ion-list>
                    <ion-item v-for="i in 15" :key="i" v-if="drink.strIngredient1">
                        <ion-label>{{ drink['strIngredient' + i] }}</ion-label>
                        <ion-note slot="end">{{ drink['strMeasure' + i] }}</ion-note>
                    </ion-item>
                </ion-list>
            </ion-list-header>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';

defineProps({
    drink: {
        type: Object,
        required: true
    }
});
</script>