import { styled } from '@mui/material/styles';
import { Card, CardMedia } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
  },
}));

export const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}); 