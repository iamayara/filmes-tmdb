import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useGenreStore = defineStore('genre', () => {
  const state = reactive({
    genres: [],
    currentGenreId: null,
  });

  const genres = computed(() => state.genres);

  const currentGenreId = computed(() => state.currentGenreId);
  const setCurrentGenreId = (genreId) => {
    state.currentGenreId = genreId;
  };

  const getGenreName = (id) => {
    const genre = state.genres.find((genre) => genre.id === id);
    return genre ? genre.name : 'Desconhecido';
  };

  const getAllGenres = async (type) => {
    try {
      const response = await api.get(`genre/${type}/list`, {
        params: { language: 'pt-BR' },
      });
      state.genres = response.data.genres;
    } catch (error) {
      console.error(`Erro ao buscar gêneros de ${type}:`, error);
      state.genres = [];
    }
  };

  return {
    genres,
    getAllGenres,
    getGenreName,
    currentGenreId,
    setCurrentGenreId,
  };
});
