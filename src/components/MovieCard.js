import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * MovieCard component to display individual movie details in a card layout.
 *
 * @param {object} props
 * @param {object} props.movie The movie object containing details like title, poster_path, etc.
 * @param {boolean} props.isFavorite Indicates whether the movie is in the user's favorites list.
 * @param {Function} props.onToggleFavorite Callback function triggered when the favorite button is clicked.
 * @returns {JSX.Element}
 */
function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://dummyimage.com/500x750/cccccc/000000&text=No+Image';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <IconButton 
        onClick={() => onToggleFavorite(movie)}
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, bgcolor: 'rgba(0,0,0,0.5)', color: isFavorite ? 'red' : 'white' }}
        aria-label="Toggle favorite"
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
      
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="380"
          image={posterUrl}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;