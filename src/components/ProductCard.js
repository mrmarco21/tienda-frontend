import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  styled,
  useTheme,
  Tooltip,
  Zoom,
  IconButton as MuiIconButton,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  ZoomIn as ZoomInIcon,
  LocalOffer as LocalOfferIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as HighlightOffIcon,
} from '@mui/icons-material';
import { formatPrice } from '../utils/formatters';
import { getImageUrl } from '../config';

const calculateArrivalEstimate = (arrivalDate) => {
  if (!arrivalDate) return "Próximamente";
  
  const arrival = new Date(arrivalDate);
  const now = new Date();
  const diffWeeks = Math.ceil((arrival - now) / (1000 * 60 * 60 * 24 * 7));
  
  if (diffWeeks <= 0) return "¡Muy pronto!";
  if (diffWeeks === 1) return "¡Llega la próxima semana!";
  if (diffWeeks <= 4) return `¡Llega en ${diffWeeks} semanas!`;
  
  const diffMonths = Math.ceil(diffWeeks / 4);
  if (diffMonths === 1) return "¡Llega el próximo mes!";
  return `¡Llega en ${diffMonths} meses!`;
};

const CARD_SIZE = 300; // Aumentado ligeramente para mejor distribución
const CARD_WIDTH_MOBILE = 160; // Aumentado ligeramente
const CARD_HEIGHT_MOBILE = 250; // Aumentado para dar más espacio

const StyledCard = styled(Card)(({ theme }) => ({
  width: CARD_SIZE,
  height: CARD_SIZE,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
    '& .zoom-button': {
      opacity: 1,
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: CARD_WIDTH_MOBILE,
    height: CARD_HEIGHT_MOBILE,
    borderRadius: '8px',
    margin: theme.spacing(1),
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '60%',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '50%',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s ease-in-out',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: theme.palette.grey[100],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: '40%',
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '50%',
    padding: theme.spacing(1),
  },
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    top: 4,
    right: 4,
    height: 24,
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: 24,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    height: 20,
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
}));

const WhatsAppButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: '#25D366',
  color: '#fff',
  padding: 8,
  zIndex: 2,
  '&:hover': {
    backgroundColor: '#128C7E',
  },
  [theme.breakpoints.down('sm')]: {
    padding: 6,
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5),
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  },
}));

const StyledChip = styled(Chip)(({ theme, color }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 'bold',
}));

const DialogBadge = styled(Box)(({ theme, color = 'primary' }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette[color].main,
  color: 'white',
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.spacing(2),
  fontWeight: 'bold',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  boxShadow: theme.shadows[2],
}));

const CloseButton = styled(MuiIconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();

  // Aseguramos que el nombre del producto sea consistente
  const productName = product?.name?.trim() || 'Sin nombre';

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageClick = () => {
    setOpen(true);
  };

  const handleImageDialogClose = () => {
    setSelectedImage(null);
  };

  const handleImageError = () => {
    console.error('Error al cargar la imagen:', product.image_url);
    setImageError(true);
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const phoneNumber = '967603871';
    const message = `¡Hola! 👋\nMe interesa el producto "${productName}" que vi en Chest Shop.\nPrecio: S/.${product.price}\n¿Podrías brindarme más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const imageUrl = imageError || !product.image_url ? 
    'https://placehold.co/400x300/e5e7eb/a3a3a3?text=Imagen+no+disponible' : 
    getImageUrl(product.image_url);

  console.log('URL de la imagen:', imageUrl);

  return (
    <>
      <StyledCard>
        <ImageContainer>
          <StyledCardMedia
            component="img"
            image={imageUrl}
            alt={productName}
            onError={handleImageError}
            onClick={handleImageClick}
          />
          <PriceChip
            label={formatPrice(product.price)}
            icon={<LocalOfferIcon />}
          />
          <IconButton
            className="zoom-button"
            onClick={handleImageClick}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            <ZoomInIcon />
          </IconButton>
        </ImageContainer>

        <StyledCardContent>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                fontWeight: 'bold',
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {productName}
            </Typography>
            
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.description}
            </Typography>
          </Box>

          <Box sx={{ mt: 'auto', position: 'relative', minHeight: { xs: '32px', sm: '40px' } }}>
            <Tooltip title="Consultar por WhatsApp" TransitionComponent={Zoom}>
              <WhatsAppButton
                onClick={handleWhatsAppClick}
                size="small"
              >
                <WhatsAppIcon />
              </WhatsAppButton>
            </Tooltip>
          </Box>
        </StyledCardContent>
      </StyledCard>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'background.paper', 
          borderBottom: 1, 
          borderColor: 'divider',
          position: 'relative',
          p: 2
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {productName}
            </Typography>
            <IconButton 
              onClick={handleClose}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <Box sx={{ position: 'relative' }}>
            {product.is_new && !product.is_coming_soon && (
              <DialogBadge>
                <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  🌟 ¡NUEVO!
                </Box>
              </DialogBadge>
            )}
            {product.is_coming_soon && (
              <DialogBadge color="secondary">
                <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  🔜 {calculateArrivalEstimate(product.arrival_date)}
                </Box>
              </DialogBadge>
            )}
            <img
              src={imageUrl}
              alt={productName || 'Producto'}
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '70vh',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={handleImageError}
            />
          </Box>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              {product.description || 'Sin descripción'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocalOfferIcon color="action" fontSize="small" />
              <Typography variant="body2">
                {product.category}
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              {formatPrice(product.price)}
            </Typography>
            {!product.is_coming_soon && (
              <Typography 
                variant="body2" 
                color={product.stock > 0 ? "success.main" : "error.main"}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  mb: 2,
                  fontWeight: 'medium'
                }}
              >
                {product.stock > 0 ? (
                  <>
                    <CheckCircleIcon fontSize="small" />
                    Disponible ({product.stock} en stock)
                  </>
                ) : (
                  <>
                    <HighlightOffIcon fontSize="small" />
                    Agotado
                  </>
                )}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={handleClose} variant="outlined">
            Cerrar
          </Button>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsAppClick}
            color="success"
          >
            Consultar por WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard; 