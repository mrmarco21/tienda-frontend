import { styled } from '@mui/material/styles';
import { Toolbar, InputBase, AppBar } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme, isadmin }) => ({
  backgroundColor: isadmin === 'true' ? '#1976d2' : '#FE6B8B',
  boxShadow: 'none',
  borderBottom: `1px solid ${isadmin === 'true' ? '#1565c0' : '#E5507A'}`,
  transition: 'all 0.3s ease-in-out',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  height: '80px',
  [theme.breakpoints.down('sm')]: {
    height: '70px',
  },
}));

export const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const LogoImg = styled('img')({
  height: '70px',
  marginRight: '15px',
  transition: 'transform 0.3s ease-in-out',
  '@media (max-width: 600px)': {
    height: '60px',
    marginRight: '10px',
  },
});

export const StoreName = styled('div')(({ theme, isadmin }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .main-text': {
    fontSize: '1.9rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    letterSpacing: '0.5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  '& .sub-text': {
    fontSize: '0.9rem',
    opacity: 0.9,
    letterSpacing: '1px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export const NavActions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
})); 