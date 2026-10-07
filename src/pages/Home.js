import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Typography, TextField, Button, Box, CircularProgress, Alert, MenuItem } from '@mui/material';
import api from '../api';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

/**
 * Home page component serving as the main dashboard for discovering movies.
 * Features trending movies, a search bar, and filtering capabilities by rating and year.
 *
 * @returns {JSX.Element}
 */
function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filter States for Bonus Features
  const [ratingFilter, setRatingFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState('');
  
  const { favorites, toggleFavorite } = useContext(MovieContext);

  // Initialize view: check local storage for previous searches, else fetch trending.
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchQuery(lastSearch);
      fetchMovies(lastSearch, 1, false);
    } else {
      fetchTrending(1, false);
    }
  }, []);

  /**
   * Fetches the current trending movies from the TMDb API.
   *
   * @param {number} pageNum The API page number to retrieve.
   * @param {boolean} append Whether to append results (true) or replace the existing state (false).
   */
  const fetchTrending = async (pageNum, append = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/trending/movie/week?page=${pageNum}`);
      setMovies((prev) => append ? [...prev, ...res.data.results] : res.data.results);
    } catch (err) {
      setError('Failed to fetch movie data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches movies from the TMDb API based on a search query.
   *
   * @param {string} query The search string provided by the user.
   * @param {number} pageNum The API page number to retrieve.
   * @param {boolean} append Whether to append results (true) or replace the existing state (false).
   */
  const fetchMovies = async (query, pageNum, append = false) => {
    if (!query.trim()) {
      fetchTrending(1, false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`);
      setMovies((prev) => append ? [...prev, ...res.data.results] : res.data.results);
      localStorage.setItem('lastSearch', query);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles form submission to execute a new search query.
   * Resets pagination to the first page.
   *
   * @param {Event} e The form submission event.
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(searchQuery, 1, false);
  };

  /**
   * Handles the 'Load More' action by incrementing the page index 
   * and fetching the next set of data based on the current context (Search vs. Trending).
   */
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (searchQuery.trim()) {
      fetchMovies(searchQuery, nextPage, true);
    } else {
      fetchTrending(nextPage, true);
    }
  };

  // Filter Logic execution before rendering
  const displayedMovies = movies.filter(movie => {
    const matchRating = movie.vote_average >= ratingFilter;
    const matchYear = yearFilter ? movie.release_date?.startsWith(yearFilter) : true;
    return matchRating && matchYear;
  });

  return (
    <Container sx={{ py: 4 }}>
      {/* Search Section */}
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          id="search-input"
          label="Search Movies" 
          fullWidth
          variant="outlined"
          placeholder="e.g., Inception"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" type="submit" size="large">
          Search
        </Button>
      </Box>

      {/* Filter Section */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          id="rating-select"
          select
          label="Minimum Rating"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value={0}>All Ratings</MenuItem>
          <MenuItem value={6}>6+ Stars</MenuItem>
          <MenuItem value={7}>7+ Stars</MenuItem>
          <MenuItem value={8}>8+ Stars</MenuItem>
        </TextField>
        
        <TextField
          id="year-filter-input"
          label="Filter by Year (e.g. 2023)"
          fullWidth
          variant="outlined"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Typography variant="h5" gutterBottom fontWeight="bold">
        {searchQuery.trim() ? `Search Results for "${searchQuery}"` : 'Trending Movies'}
      </Typography>

      {/* Movies Grid */}
      <Grid container spacing={3}>
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${movie.id}-${index}`}>
              <MovieCard
                movie={movie}
                isFavorite={favorites.some((f) => f.id === movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No movies found matching your filters.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Load More Button */}
      {movies.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" size="large" onClick={handleLoadMore} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Load More'}
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default Home;