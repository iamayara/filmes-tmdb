import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWE1Y2I0NjVmYTg0MzIyYzZjMWRjN2M2YzFkYTQ3OCIsIm5iZiI6MTc2MDM2MzkyNy43NTUsInN1YiI6IjY4ZWQwNTk3MWQzY2RiZDllM2E3MmEzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PgIrYNL2wIgPu6SKMN4-2EiW3Swteqv9dnbxLBjs50Y`,
  },
});

export default api;
