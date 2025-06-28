import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogContent,
  Fade,
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Todos', 'Ropa', 'Zapatos', 'Accesorios'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        
        // Aseguramos que los datos de los productos estén limpios
        const cleanedProducts = response.data.map(product => ({
          ...product,
          name: product.name?.trim() || 'Sin nombre',
          description: product.description?.trim() || 'Sin descripción',
          category: product.category?.trim() || 'Sin categoría'
        }));
        
        setProducts(cleanedProducts);
        setFilteredProducts(cleanedProducts);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setError('Error al cargar los productos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory && selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.5rem' },
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Nuestros Productos
        </Typography>

        <Grid 
          container 
          spacing={2} 
          sx={{ 
            mb: { xs: 2, sm: 4 },
            px: { xs: 1, sm: 0 }
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Buscar productos"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Categoría"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid 
          container 
          spacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ 
            px: { xs: 1, sm: 0 }
          }}
        >
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={6} md={4} key={product.id}>
              <Fade in timeout={500}>
                <Box>
                  <ProductCard product={product} />
                </Box>
              </Fade>
            </Grid>
          ))}
          {filteredProducts.length === 0 && (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: 2,
                  mt: 2
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No se encontraron productos
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Intenta con otros filtros de búsqueda
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Producto"
              style={{ 
                width: '100%', 
                height: 'auto',
                display: 'block'
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Products; 