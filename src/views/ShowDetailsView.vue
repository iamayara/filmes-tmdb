<script setup>
import { defineProps, onMounted } from 'vue';
import { useShowsStore } from '@/stores/shows';

const showsStore = useShowsStore();

const props = defineProps({
  showId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await showsStore.getShowsDetail(props.showId);
});
</script>

<template>
  <div v-if="showsStore.currentShow && showsStore.currentShow.name" class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w300${showsStore.currentShow.poster_path}`"
        :alt="showsStore.currentShow.name"
      />

      <div class="details">
        <h1>{{ showsStore.currentShow.name }}</h1>
        <p v-if="showsStore.currentShow.tagline">
          {{ showsStore.currentShow.tagline }}
        </p>
        <p>{{ showsStore.currentShow.overview }}</p>
        <p>
          <strong>Primeira exibição:</strong>
          {{ showsStore.currentShow.first_air_date }}
        </p>
        <p>
          <strong>Avaliação:</strong>
          {{ showsStore.currentShow.vote_average }}
        </p>
        <p v-if="showsStore.currentShow.number_of_seasons">
          <strong>Temporadas:</strong>
          {{ showsStore.currentShow.number_of_seasons }}
        </p>
        <p v-if="showsStore.currentShow.number_of_episodes">
          <strong>Episódios:</strong>
          {{ showsStore.currentShow.number_of_episodes }}
        </p>
      </div>
    </div>

    <h2>Canais / Produtoras</h2>
    <div class="companies">
      <template
        v-for="network in showsStore.currentShow.networks"
        :key="network.id"
      >
        <img
          v-if="network.logo_path"
          :src="`https://image.tmdb.org/t/p/w92${network.logo_path}`"
          :alt="network.name"
        />
        <p v-else>{{ network.name }}</p>
      </template>
    </div>
  </div>

  <div v-else class="loading">Carregando...</div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
}

.content img {
  width: 250px;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem #000;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
}

.companies {
  display: flex;
  flex-wrap: wrap;
  column-gap: 3rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.companies img {
  max-height: 50px;
  object-fit: contain;
}
.loading {
  text-align: center;
  margin-top: 3rem;
}
</style>
