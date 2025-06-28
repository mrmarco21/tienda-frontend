import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  useTheme,
  IconButton,
  Card,
  CardContent,
  useMediaQuery,
  Fade,
  Slide
} from '@mui/material';
import { 
  Search as SearchIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  WhatsApp as WhatsAppIcon,
  LocalOffer as LocalOfferIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  Favorite as FavoriteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ProductCard from '../components/ProductCard';
import { API_BASE_URL } from '../config';
import LOGO_TIENDA from '../assets/images/LOGO_TIENDA.png';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FE6B8B 0%, #FF8E53 100%)',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    minHeight: '60vh',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/path/to/pattern.png")',
    opacity: 0.1,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, white, transparent)',
    zIndex: 2,
  }
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  textAlign: 'center',
  color: 'white',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: theme.spacing(0, 4),
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '50px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
      '& fieldset': {
        borderColor: 'transparent',
      },
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #FE6B8B 0%, #FF8E53 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(254, 107, 139, 0.3)',
  '& svg': {
    fontSize: 30,
    color: 'white',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.5rem',
  marginBottom: theme.spacing(4),
  position: 'relative',
  display: 'inline-block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 80,
    height: 4,
    background: 'linear-gradient(to right, #FE6B8B, #FF8E53)',
    borderRadius: 2,
  },
}));

const ProductSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: '#fff',
  position: 'relative',
  '&.new-products': {
    background: 'linear-gradient(135deg, rgba(254,107,139,0.05) 0%, rgba(255,142,83,0.05) 100%)',
  },
  '&.coming-soon': {
    background: 'linear-gradient(135deg, rgba(63,81,181,0.05) 0%, rgba(100,181,246,0.05) 100%)',
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '50px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&.MuiChip-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const descriptionMatch = product.description ? product.description.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesSearch = nameMatch || descriptionMatch;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && !product.is_coming_soon;
  });

  const newProducts = products.filter(product => product.is_new && !product.is_coming_soon);
  const comingSoonProducts = products.filter(product => product.is_coming_soon);

  const calculateArrivalEstimate = (arrivalDate) => {
    const today = new Date();
    const arrival = new Date(arrivalDate);
    const diffTime = arrival - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Si faltan más de 30 días
    if (diffDays > 30) {
      const months = Math.ceil(diffDays / 30);
      return `Aprox. ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
    
    // Si faltan más de 7 días
    if (diffDays > 7) {
      const weeks = Math.ceil(diffDays / 7);
      return `Aprox. ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    }
    
    // Si faltan menos de 7 días
    if (diffDays > 0) {
      return 'Llegada próxima';
    }
    
    return 'Próximamente';
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '967603871';
    const message = `¡Hola! ��\nMe gustaría conocer más sobre los productos disponibles en Chest Shop.\n¿Podrías brindarme más información sobre las últimas novedades y ofertas?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={true} timeout={1000}>
                <HeroContent>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      marginBottom: 2,
                      lineHeight: 1.2
                    }}
                  >
                    Descubre tu Estilo
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      marginBottom: 4,
                      opacity: 0.9,
                      fontWeight: 300
                    }}
                  >
                    Las últimas tendencias en moda y accesorios
                  </Typography>
                  <SearchBar
                    fullWidth
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ maxWidth: 500 }}
                  />
                </HeroContent>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Fade in={true} timeout={1500}>
                <Box
                  component="img"
                  src={LOGO_TIENDA}
                  alt="Hero Image"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
                  }}
                />
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ marginTop: -8, position: 'relative', zIndex: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <LocalShippingIcon />, title: 'Envío Rápido', description: 'Entrega segura y a tiempo' },
            { icon: <SecurityIcon />, title: 'Compra Segura', description: 'Transacciones 100% seguras' },
            { icon: <WhatsAppIcon />, title: 'Soporte 24/7', description: 'Estamos aquí para ayudarte' }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={true} timeout={1000 + (index * 500)}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      <ProductSection className="new-products">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h2">
              Nuevos Productos
            </SectionTitle>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              Descubre nuestras últimas novedades y mantente a la moda con nuestras nuevas colecciones
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {products
              .filter(product => product.is_new)
              .map((product, index) => (
                <Grid item xs={6} sm={6} md={4} key={product.id}>
                  <Fade in={true} timeout={1000 + (index * 200)}>
                    <Box>
                      <ProductCard product={product} />
                    </Box>
                  </Fade>
                </Grid>
              ))}
          </Grid>
        </Container>
      </ProductSection>

      <ProductSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h2">
              Catálogo
            </SectionTitle>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {['Todos', 'Ropa', 'Zapatos', 'Accesorios'].map((category) => (
                <CategoryChip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category === 'Todos' ? 'all' : category)}
                  variant={selectedCategory === (category === 'Todos' ? 'all' : category) ? 'filled' : 'outlined'}
                  color="primary"
                />
              ))}
            </Box>
          </Box>
          <Grid container spacing={3}>
            {products
              .filter(product => !product.is_new && !product.is_coming_soon)
              .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
              .map((product, index) => (
                <Grid item xs={6} sm={6} md={4} key={product.id}>
                  <Fade in={true} timeout={1000 + (index * 200)}>
                    <Box>
                      <ProductCard product={product} />
                    </Box>
                  </Fade>
                </Grid>
              ))}
          </Grid>
        </Container>
      </ProductSection>

      <ProductSection className="coming-soon">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h2">
              Próximamente
            </SectionTitle>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              Anticípate a las nuevas tendencias con nuestros próximos lanzamientos
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {products
              .filter(product => product.is_coming_soon)
              .map((product, index) => (
                <Grid item xs={6} sm={6} md={4} key={product.id}>
                  <Fade in={true} timeout={1000 + (index * 200)}>
                    <Box>
                      <ProductCard product={product} />
                    </Box>
                  </Fade>
                </Grid>
              ))}
          </Grid>
        </Container>
      </ProductSection>

      <Box 
        sx={{ 
          py: 8, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(254,107,139,0.05) 0%, rgba(255,142,83,0.05) 100%)'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
            ¿Necesitas ayuda?
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Estamos aquí para responder tus preguntas y ayudarte con tu compra
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsAppClick}
            sx={{
              borderRadius: '50px',
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            Contáctanos por WhatsApp
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 