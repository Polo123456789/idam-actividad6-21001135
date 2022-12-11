<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Pablo Sanchez (21001135)</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Pablo Sanchez (21001135)</ion-title>
        </ion-toolbar>
      </ion-header>
    
    <h1 class="text-center">Gestor de Contactos</h1>
    <ion-searchbar v-model="busqueda" placeholder="Buscar por nombre o telefono"></ion-searchbar>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button>
        <ion-icon :icon="newspaperOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-card v-for="contacto of contactosFiltrados" :key="contacto.id">
      <ion-card-header>
        <ion-card-title>{{contacto.nombre}}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ul>
          <li>Telefono de Casa: {{contacto.casa}}</li>
          <li>Telefono Movil: {{contacto.movil}}</li>
          <li>Direccion: {{contacto.direccion}}</li>
          <li>Correo: {{contacto.correo}}</li>
        </ul>
      </ion-card-content>
    </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { newspaperOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import Fuse from 'fuse.js';

import { getContactos, Contacto } from '@/firebase';

const fuseOptions = {
  keys: [
    'nombre',
    'casa',
    'movil'
  ],
}


export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    return { newspaperOutline };
  },
  data() {
    return {
      busqueda: "",
      contactos: [] as Contacto[],
    }
  },
  async mounted() {
    this.contactos = await getContactos();
  },
  computed: {
    contactosFiltrados(): Contacto[] {
      if (!this.busqueda) {
        return this.contactos;
      }
      const fuse = new Fuse(this.contactos, fuseOptions);

      return fuse.search(this.busqueda).map(i => i.item);
    }
  }
});
</script>

<style scoped>
  .text-center {
    text-align: center;
  }

  ul {
    list-style: inside;
    padding-left: 0px;
  }

</style>
