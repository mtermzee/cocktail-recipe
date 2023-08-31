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
            </ion-list-header>
            <ion-list>
                <template v-for="i in 15" :key="i">
                    <ion-item v-if="drink[`strIngredient${i}`]">
                        <ion-label>{{ drink[`strIngredient${i}`] }}</ion-label>
                        <ion-note slot="end">{{ drink[`strMeasure${i}`] }}</ion-note>
                    </ion-item>
                </template>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonListHeader, IonList, IonItem, IonLabel, IonNote } from '@ionic/vue';

defineProps({
    drink: {
        type: Object,
        required: true
    }
});
</script>