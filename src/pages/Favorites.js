import React, { useContext } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

/**
 * Favorites page component to display movies saved by the user.
 * Reads the list of favorite movies from the MovieContext.
 *
 * @returns {JSX.Element}
 */
function Favorites() {
  const { favorites, toggleFavorite } = useContext(MovieContext);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Box mt={4}>
          <Typography variant="h6" color="text.secondary">
            No favorite movies added yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites;