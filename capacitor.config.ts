import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cocktail.recipe',
  appName: 'cocktail-recipe',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
