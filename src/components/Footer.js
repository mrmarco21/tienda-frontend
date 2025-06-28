import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Box
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

// Estilos
import {
  StyledFooter,
  SocialIcon,
  NewsletterInput
} from '../styles/components/Footer.styles';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar la suscripción
    console.log('Email suscrito:', email);
    setEmail('');
  };

  return (
    <StyledFooter>
      <Container>
        <Grid container spacing={4}>
          {/* Información de la Tienda */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Somos tu tienda de confianza para encontrar las últimas tendencias en moda femenina.
              Ofrecemos calidad, estilo y los mejores precios.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                ciudad de Contamana, Loreto, Peru
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                +51 999999999
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                contacto@tienda2025.com
              </Typography>
            </Box>
          </Grid>

          {/* Enlaces Rápidos */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces Rápidos
            </Typography>
            <Link href="/productos" color="inherit" display="block" sx={{ mb: 1 }}>
              Catálogo
            </Link>
            <Link href="/nosotros" color="inherit" display="block" sx={{ mb: 1 }}>
              Sobre Nosotros
            </Link>
            {/* <Link href="/politicas" color="inherit" display="block" sx={{ mb: 1 }}>
              Políticas de Envío
            </Link>
            <Link href="/terminos" color="inherit" display="block" sx={{ mb: 1 }}>
              Términos y Condiciones
            </Link> */}
            <Link href="/contacto" color="inherit" display="block">
              Contacto
            </Link>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            {/* <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Suscríbete para recibir las últimas novedades y ofertas especiales.
            </Typography> */}
            {/* <NewsletterInput>
              <Box component="form" onSubmit={handleNewsletterSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Suscribirse
                </Button>
              </Box>
            </NewsletterInput> */}

            {/* Redes Sociales */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Síguenos
              </Typography>
              <Box>
                <SocialIcon aria-label="facebook">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon aria-label="instagram">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon aria-label="whatsapp">
                  <WhatsAppIcon />
                </SocialIcon>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} Tienda de Ropa. Todos los derechos reservados.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 