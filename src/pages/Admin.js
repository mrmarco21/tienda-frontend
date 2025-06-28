import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
  InputAdornment,
  Alert,
  Snackbar,
  Fade,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  NewReleases as NewIcon,
  AccessTime as ComingSoonIcon
} from '@mui/icons-material';
import axios from 'axios';
import { StyledFormPaper, ImagePreviewBox, FileInputBox } from '../styles/components/AdminForm.styles';
import { styled } from '@mui/material/styles';
import { formatPrice } from '../utils/formatters';
import { getImageUrl, API_BASE_URL } from '../config';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  position: 'relative',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatCard = styled(Paper)(({ theme, color = '#e3f2fd' }) => ({
  padding: theme.spacing(3),
  backgroundColor: color,
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ImagePreview = styled('img')({
  width: '100%',
  maxHeight: '200px',
  objectFit: 'contain',
  marginTop: '10px',
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ProductImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const ImagePreviewWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(1),
  backgroundColor: '#f5f5f5',
}));

const PreviewImage = styled('img')({
  width: '100%',
  maxHeight: '200px',
  objectFit: 'contain',
  borderRadius: '8px',
  marginTop: '8px',
});

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null,
    is_new: false,
    is_coming_soon: false,
    arrival_date: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const categories = ['Ropa', 'Zapatos', 'Accesorios'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      console.log('Productos obtenidos:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      showSnackbar('Error al cargar productos', 'error');
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        image: null,
        is_new: product.is_new || false,
        is_coming_soon: product.is_coming_soon || false,
        arrival_date: product.arrival_date || null
      });
      setSelectedProduct(product);
      setPreviewImage(product.image_url ? getImageUrl(product.image_url) : null);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: null,
        is_new: false,
        is_coming_soon: false,
        arrival_date: null
      });
      setSelectedProduct(null);
      setPreviewImage(null);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setPreviewImage(null);
    if (previewImage && !previewImage.includes('localhost')) {
      URL.revokeObjectURL(previewImage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Imagen seleccionada:', file);
      setFormData(prev => ({
      ...prev,
        image: file
    }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('is_new', formData.is_new);
      formDataToSend.append('is_coming_soon', formData.is_coming_soon);
      
      if (!formData.is_coming_soon) {
        formDataToSend.append('stock', formData.stock);
          } else {
        formDataToSend.append('stock', '0');
      }

      if (formData.arrival_date) {
        formDataToSend.append('arrival_date', formData.arrival_date);
      }

      if (formData.image) {
        formDataToSend.append('image', formData.image);
        console.log('Enviando imagen:', formData.image);
      }

      const url = selectedProduct
        ? `${API_BASE_URL}/api/products/${selectedProduct.id}`
        : `${API_BASE_URL}/api/products`;

      console.log('Enviando datos:', Object.fromEntries(formDataToSend));

      const response = await fetch(url, {
        method: selectedProduct ? 'PUT' : 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar el producto');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      showSnackbar(
        selectedProduct ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente',
        'success'
      );
      handleClose();
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      showSnackbar(error.message || 'Error al guardar el producto', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((acc, curr) => acc + (parseInt(curr.stock) || 0), 0),
    categories: products.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {}),
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 6,
        borderBottom: '2px solid #f0f0f0',
        pb: 2
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
            Panel de Administración
          </Typography>
        <ActionButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          sx={{ 
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE5B7B 30%, #FF7E43 90%)',
            }
          }}
        >
          Nuevo Producto
        </ActionButton>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <StatCard elevation={4} color="#e3f2fd">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DashboardIcon sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="h6" color="#1976d2">Total Productos</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {stats.totalProducts}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard elevation={4} color="#f3e5f5">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InventoryIcon sx={{ mr: 1, color: '#9c27b0' }} />
              <Typography variant="h6" color="#9c27b0">Stock Total</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
              {stats.totalStock}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard elevation={4} color="#e8f5e9">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CategoryIcon sx={{ mr: 1, color: '#2e7d32' }} />
              <Typography variant="h6" color="#2e7d32">Categorías</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              {Object.keys(stats.categories).length}
            </Typography>
          </StatCard>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
        Catálogo de Productos
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Fade in={true} timeout={500}>
              <StyledPaper elevation={3}>
                <Box sx={{ position: 'relative', mb: 2, height: 200, overflow: 'hidden' }}>
                  <ProductImage
                    src={getImageUrl(product.image_url)}
                    alt={product.name}
                    onError={(e) => {
                      console.error('Error al cargar imagen:', product.image_url);
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  {product.is_new && (
                    <Chip
                      icon={<NewIcon />}
                      label="¡NUEVO!"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                  {product.is_coming_soon && (
                    <Chip
                      icon={<ComingSoonIcon />}
                      label="PRÓXIMAMENTE"
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: product.is_new ? 48 : 8,
                        right: 8,
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '40px'
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      label={`Stock: ${product.stock}`}
                      size="small"
                      color={product.stock > 0 ? "success" : "error"}
                    />
                    <Chip 
                      label={product.category}
                      size="small"
                      color="default"
                    />
                  </Stack>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <ActionButton
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(product)}
                    fullWidth
                  >
                    Editar
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(product.id)}
                    fullWidth
                  >
                    Eliminar
                  </ActionButton>
                </Box>
              </StyledPaper>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={dialogOpen} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        PaperProps={{
          elevation: 24,
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid #f0f0f0',
          bgcolor: 'background.paper',
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {selectedProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
              <TextField
              fullWidth
              label="Nombre del Producto"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
              />
              <TextField
              fullWidth
              label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
              <TextField
              fullWidth
              label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
              }}
              sx={{ mb: 2 }}
            />
            {!formData.is_coming_soon && (
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                margin="normal"
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
              <TextField
              fullWidth
                select
                label="Categoría"
              name="category"
                value={formData.category}
                onChange={handleInputChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            
            <Box sx={{ 
              p: 2, 
              bgcolor: '#f5f5f5', 
              borderRadius: 1,
              mb: 2
            }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Opciones Especiales
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_new}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    name="is_new"
                    color="primary"
                  />
                }
                label="Marcar como Nuevo"
                sx={{ display: 'block', mb: 1 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_coming_soon}
                    onChange={(e) => {
                      const isComingSoon = e.target.checked;
                      setFormData({ 
                        ...formData, 
                        is_coming_soon: isComingSoon,
                        stock: isComingSoon ? '0' : formData.stock
                      });
                    }}
                    name="is_coming_soon"
                    color="secondary"
                  />
                }
                label="Próximamente"
                sx={{ display: 'block' }}
              />
            </Box>

            {formData.is_coming_soon && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  * La fecha es aproximada y puede variar según la disponibilidad
                </Typography>
                <TextField
                  fullWidth
                  label="Fecha Aproximada de Llegada"
                  name="arrival_date"
                  type="date"
                  value={formData.arrival_date || ''}
                  onChange={handleInputChange}
                  required={formData.is_coming_soon}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  helperText="Selecciona una fecha estimada de llegada"
                />
              </Box>
            )}

            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<CloudUploadIcon />}
              sx={{ 
                p: 1.5,
                border: '2px dashed #1976d2',
                '&:hover': {
                  border: '2px dashed #1976d2',
                }
              }}
            >
              {formData.image ? 'Cambiar Imagen' : 'Subir Imagen del Producto'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {(previewImage || formData.image) && (
              <ImagePreviewWrapper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {formData.image ? `Imagen seleccionada: ${formData.image.name}` : 'Imagen actual del producto'}
                  </Typography>
                  {previewImage && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
                <PreviewImage
                  src={previewImage}
                  alt="Vista previa"
                  onError={(e) => {
                    console.error('Error al cargar la vista previa');
                    e.target.src = 'https://placehold.co/400x300/e5e7eb/a3a3a3?text=Vista+previa+no+disponible';
                  }}
                />
              </ImagePreviewWrapper>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2, 
          borderTop: '1px solid #f0f0f0',
          bgcolor: 'background.paper'
        }}>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)',
              }
            }}
          >
            {selectedProduct ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Admin; 