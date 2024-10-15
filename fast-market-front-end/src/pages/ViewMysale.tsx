import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Box, Button, useMediaQuery } from '@mui/material';

/* Componentes */
import Header from '../components/Header';
import Loader from '../components/Loader';
import Menubelow from '../components/Menubelow';

const Mysale: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
          <Header />
          <Menubelow />
          <Container maxWidth="lg" style={{ paddingTop: '16px', color: 'black' }}>
            <Typography variant="h5" gutterBottom>
              Mis ventas
            </Typography>

            <Card variant="outlined" style={{ marginBottom: '16px', width: '100%' }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent="space-between"
                  alignItems={isMobile ? 'flex-start' : 'center'}
                >
                  <Typography variant="h6" style={{ marginBottom: isMobile ? '8px' : '0' }}>
                    Crear nueva venta
                  </Typography>
                  <Button variant="contained" color="primary" size={isMobile ? 'small' : 'large'}>
                    Crear publicacion
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card variant="outlined" style={{ marginBottom: '16px', width: '100%' }}>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {/* Columna 1: Imagen del producto */}
                <Box flex={1} minWidth="200px">
                  <CardMedia
                    component="img"
                    alt="Memoria Ram"
                    image="https://m.media-amazon.com/images/I/61XmhmEup8L._AC_UF1000,1000_QL80_.jpg"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>

                {/* Columna 2: Detalles del producto */}
                <Box flex={2} display="flex" flexDirection="column" padding="16px">
                  <CardContent>
                    <Typography variant="h6">Memoria Ram 16gb DDR4 Laptop</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="16px">
                      <Typography variant="h6">MX$550</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Estado · Vendido
                      </Typography>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="flex-start">
                      <Button variant="contained" color="primary" size="medium" style={{ marginRight: '8px' }}>
                        Editar Publicacion
                      </Button>
                      <Button variant="outlined" color="primary" size="medium" style={{ marginRight: '8px' }}>
                        Eliminar
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Box>
            </Card>
            <Card variant="outlined" style={{ marginBottom: '16px', width: '100%' }}>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {/* Columna 1: Imagen del producto */}
                <Box flex={1} minWidth="200px">
                  <CardMedia
                    component="img"
                    alt="Memoria Ram"
                    image="https://m.media-amazon.com/images/I/61XmhmEup8L._AC_UF1000,1000_QL80_.jpg"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>

                <Box flex={2} display="flex" flexDirection="column" padding="16px">
                  <CardContent>
                    <Typography variant="h6">Memoria Ram 16gb DDR4 Laptop</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="16px">
                      <Typography variant="h6">MX$550</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Estado · Vendido
                      </Typography>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="flex-start">
                      <Button variant="contained" color="primary" size="medium" style={{ marginRight: '8px' }}>
                        Editar Publicacion
                      </Button>
                      <Button variant="outlined" color="primary" size="medium" style={{ marginRight: '8px' }}>
                        Eliminar
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Box>
            </Card>
            <Card variant="outlined" style={{ marginBottom: '16px', width: '100%' }}>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Box flex={1} minWidth="200px">
                  <CardMedia
                    component="img"
                    alt="Memoria Ram"
                    image="https://m.media-amazon.com/images/I/61XmhmEup8L._AC_UF1000,1000_QL80_.jpg"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>

                <Box flex={2} display="flex" flexDirection="column" padding="16px">
                  <CardContent>
                    <Typography variant="h6">Memoria Ram 16gb DDR4 Laptop</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="16px">
                      <Typography variant="h6">MX$550</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Estado · Vendido
                      </Typography>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="flex-start">
                      <Button variant="contained" color="primary" size="medium" style={{ marginRight: '8px' }}>
                        Editar Publicacion
                      </Button>
                      <Button variant="outlined" color="primary" size="medium" style={{ marginRight: '8px' }}>
                        Eliminar
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Box>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
};

export default Mysale;
