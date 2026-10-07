import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, CircularProgress, Grid } from '@mui/material';
import api from '../api';

/**
 * MovieDetails page component to display in-depth information about a specific title.
 * Fetches data via the TMDb API based on the movie ID parameter in the URL.
 * Included additional metadata fetching for 'videos' (trailers) and 'credits' (cast).
 *
 * @returns {JSX.Element}
 */
function MovieDetails() {
  const { id } = useParams(); // Extracts the movie ID from the router URL parameter.
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch details when the component mounts or the ID parameter changes.
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/movie/${id}?append_to_response=videos,credits`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Box sx={{ textAlign: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (!movie) return <Typography align="center" mt={5}>Movie not found.</Typography>;

  // Attempt to locate a YouTube trailer within the returned video metadata.
  const trailer = movie.videos?.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <img 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://dummyimage.com/500x750/cccccc/000000&text=No+Image'} 
            alt={movie.title} 
            style={{ width: '100%', borderRadius: '8px' }} 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            {movie.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {movie.release_date} | {movie.vote_average.toFixed(1)} / 10
          </Typography>
          <Box sx={{ mb: 2 }}>
            {movie.genres?.map(g => (
              <Chip key={g.id} label={g.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography variant="h5" gutterBottom mt={3}>Overview</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.overview}
          </Typography>
          
          <Typography variant="h5" gutterBottom mt={3}>Cast</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {movie.credits?.cast?.slice(0, 5).map(c => c.name).join(', ')}
          </Typography>

          {/* Conditional rendering for the embedded YouTube trailer iframe */}
          {trailer && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>Trailer</Typography>
              <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={`https://www.youtube.com/embed/${trailer.key}`} 
                  title="YouTube trailer" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MovieDetails;