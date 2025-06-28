import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#2c3e50',
  color: 'white',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(3),
}));

export const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

export const NewsletterInput = styled('div')(({ theme }) => ({
  '& .MuiTextField-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
})); 