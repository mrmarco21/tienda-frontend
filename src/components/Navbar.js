import React, { useState } from 'react';
import { 
  Typography, 
  Container,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  Zoom,
  Badge,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import LogoTienda from '../assets/images/LOGO_TIENDA.png';

// Estilos
import {
  StyledAppBar,
  StyledToolbar,
  LogoContainer,
  LogoImg,
  StoreName,
  NavActions,
} from '../styles/components/Navbar.styles';

const Navbar = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAdmin = location.pathname.includes('/admin');

  const handleAdminClick = () => {
    setOpenLoginDialog(true);
  };

  const handleClose = () => {
    setOpenLoginDialog(false);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      handleClose();
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <StyledAppBar position="sticky" isadmin={isAdmin ? 'true' : 'false'}>
        <Container maxWidth="lg">
          <StyledToolbar>
            <LogoContainer>
              <Link to={isAdmin ? "/admin" : "/"} style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
                <LogoImg src={LogoTienda} alt="Chest Shop Logo" />
                <StoreName isadmin={isAdmin ? 'true' : 'false'}>
                  <Typography className="main-text" variant="h4" component="span">
                    Chest Shop
                  </Typography>
                  <Typography className="sub-text" variant="subtitle2" component="span">
                    {isAdmin ? 'Panel Administrativo' : 'Tu estilo, tu elección'}
                  </Typography>
                </StoreName>
              </Link>
            </LogoContainer>

            <NavActions>
              {isAdmin ? (
                <>
                  <Tooltip title="Ir a la tienda" TransitionComponent={Zoom} arrow>
                    <IconButton 
                      color="inherit" 
                      onClick={() => navigate('/')}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <StoreIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cerrar sesión" TransitionComponent={Zoom} arrow>
                    <IconButton 
                      color="inherit" 
                      onClick={handleLogout}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Acceso administrativo" TransitionComponent={Zoom} arrow>
                  <IconButton 
                    color="inherit" 
                    onClick={handleAdminClick}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <AdminPanelSettingsIcon />
                  </IconButton>
                </Tooltip>
              )}
            </NavActions>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Dialog 
        open={openLoginDialog} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '400px',
            p: 2,
            borderRadius: 2,
          }
        }}
        TransitionComponent={Zoom}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          color: '#FE6B8B',
          borderBottom: '2px solid #f0f0f0',
          pb: 2,
        }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Acceso Administrativo
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Usuario"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {error && (
              <Typography 
                color="error" 
                variant="body2" 
                sx={{ 
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          gap: 1,
        }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            fullWidth
            sx={{
              borderColor: '#FE6B8B',
              color: '#FE6B8B',
              '&:hover': {
                borderColor: '#E5507A',
                backgroundColor: 'rgba(254, 107, 139, 0.1)',
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleLogin} 
            variant="contained" 
            fullWidth
            sx={{ 
              bgcolor: '#FE6B8B',
              '&:hover': {
                bgcolor: '#E5507A'
              }
            }}
          >
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar; 