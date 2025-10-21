import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useShowsStore = defineStore('shows', () => {
  const state = reactive({
    currentShow: {},
  });

  const currentShow = computed(() => state.currentShow);

  const getShowsDetail = async (showId) => {
    try {
      const response = await api.get(`tv/${showId}`, {
        params: { language: 'pt-BR' },
      });
      state.currentShow = response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do programa:', error);
    }
  };

  return {
    currentShow,
    getShowsDetail,
  };
});

