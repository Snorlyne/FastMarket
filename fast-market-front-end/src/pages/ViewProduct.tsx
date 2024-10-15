import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Grid, Button } from '@mui/material';
import "./ViewProduct.css";

/* Componentes */
import Header from '../components/Header';
import Loader from '../components/Loader';
import Menubelow from '../components/Menubelow';

const ViewProducto: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [oferta, setOferta] = useState('');
  const [mejorOferta, setMejorOferta] = useState(2000);

  const handleOfertaChange = (e: React.ChangeEvent<HTMLInputElement>) => setOferta(e.target.value);

  const handlePropuestaClick = () => {
    const nuevaOferta = parseInt(oferta);
    if (nuevaOferta && nuevaOferta > mejorOferta) {
      setMejorOferta(nuevaOferta);
    }
  };

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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Menubelow />
          <Box
            sx={{
              overflowY: 'auto',
              height: `calc(100vh - 128px)`,
              padding: 2
            }}
          >
            <Grid container spacing={2}>
              {/* Sección de la imagen */}
              <Grid item xs={12} sm={4}>
                <img
                  className="main-image"
                  src="https://via.placeholder.com/150"
                  alt="Silla de escritorio"
                />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <img
                      className="thumbnail-image"
                      src="https://via.placeholder.com/50"
                      alt="Silla de escritorio"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      className="thumbnail-image"
                      src="https://via.placeholder.com/50"
                      alt="Silla de escritorio"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography variant="h4">Silla de escritorio</Typography>
                <Typography variant="h6" className="price">
                  Precio Inicial: <span>$2,000 MXN</span>
                </Typography>

                <Typography variant="body1" className="propose-title">
                  Enviar propuesta al vendedor:
                </Typography>
                <Box className="proposal-section">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Ingresa un monto"
                    value={oferta}
                    onChange={handleOfertaChange}
                  />
                  <Button
                    variant="contained"
                    className="propose-button"
                    onClick={handlePropuestaClick}
                  >
                    Propuesta
                  </Button>
                </Box>

                <Typography variant="h6">Detalle:</Typography>
                <Typography variant="body2">
                  Estado: <b>Usado - Buen estado</b>
                </Typography>
                <Typography variant="body2">
                  Único detalle, está rasgada de allí, pero fácil de cubrir, el resto
                  está en perfectas condiciones, se baja y sube fácilmente. Entrego
                  por el Toro Valenzuela.
                </Typography>

                {/* Ofertas actuales */}
                <Typography variant="h6" className="offers-title">
                  Ofertas del momento:
                </Typography>
                <Box className="offers">
                  <Button variant="contained" className="offer-button">
                    1. Oferta: $2,100
                  </Button>
                  <Button variant="contained" className="offer-button">
                    2. Oferta: $2,050
                  </Button>
                  <Button variant="contained" className="offer-button">
                    3. Oferta: $1,900
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
};

export default ViewProducto;
