<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router';

const router = useRouter();
const genreStore = useGenreStore();
const isLoading = ref(false);
const shows = ref([]);

const listShows = async (genreId) => {
  try {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
      },
    });
    shows.value = response.data.results;
  } catch (error) {
    console.error('Erro ao buscar programas de TV:', error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('pt-BR') : 'Data não informada';

function openShow(showId) {
  router.push({ name: 'ShowDetails', params: { showId } });
}


onMounted(async () => {
  try {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');
  } catch (error) {
    console.error('Erro ao buscar gêneros de TV:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listShows(genre.id)"
        class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }"
      >
        {{ genre.name }}
      </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="tv-list">
      <div v-for="show in shows" :key="show.id" class="tv-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
          :alt="show.name"
          @click="openShow(show.id)"
        />
        <div class="tv-details">
          <p class="tv-title">{{ show.name }}</p>
          <p class="tv-date">{{ formatDate(show.first_air_date) }}</p>

          <p class="tv-genres">
            <span
              v-for="genre_id in show.genre_ids"
              :key="genre_id"
              @click="listShows(genre_id)"
              :class="{ active: genre_id === genreStore.currentGenreId }"
            >
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #5d6424;
}
.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
.active {
  background-color: #abc322;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
