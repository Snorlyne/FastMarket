import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/* Componentes */
import Header from '../components/Header';
import Loader from '../components/Loader';
import Menubelow from '../components/Menubelow';

const data = [
  { id: 1, title: 'Silla Oficina Top Living', price: 'MX$2,499', img: 'https://goo.su/F5xUB' },
  { id: 2, title: 'Silla Oficina Top Megaplus', price: 'MX$2,099', img: 'https://goo.su/F5xUB' },
  { id: 3, title: 'Silla Gamer Titano', price: 'MX$1,430', img: 'https://goo.su/F5xUB' },
  { id: 4, title: 'Silla Oficina Boen', price: 'MX$1,552', img: 'https://goo.su/F5xUB' },
  { id: 5, title: 'Silla Oficina Styrka', price: 'MX$2,193', img: 'https://goo.su/F5xUB' },
  { id: 6, title: 'Silla Oficina Ejecutiva', price: 'MX$2,219', img: 'https://goo.su/F5xUB' },
];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          <Header />
          <Menubelow />

          <Container sx={{ mt: 5 }}>
            <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
              Oferta del momento:
            </Typography>

            <Box position="relative" display="flex" alignItems="center">
              <Button
                onClick={() => scroll(-300)}
                style={{ position: 'absolute', left: 0, zIndex: 1, backgroundColor: 'white', minWidth: '40px' }}
              >
                <ArrowBackIosIcon />
              </Button>

              <Box
                ref={containerRef}
                display="flex"
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': { display: 'none' }
                }}
              >
                {data.map((product, index) => (
                  <Card
                    key={index}
                    sx={{
                      minWidth: 250,
                      margin: '0 16px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.img}
                      alt={product.title}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" align="center">
                        {product.title}
                      </Typography>
                      <Typography variant="body1" color="text.primary" align="center">
                        {product.price}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="center" pb={2}>
                      <Button
                        onClick={() => history.push('/ViewProducto')}
                        variant="contained"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          fontWeight: 'bold',
                          width: '80%',
                        }}
                      >
                        ENTRAR
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Button
                onClick={() => scroll(300)}
                style={{ position: 'absolute', right: 0, zIndex: 1, backgroundColor: 'white', minWidth: '40px' }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Container>
          <Container sx={{ mt: 5 }}>
            <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
              Subasta de Ropa:
            </Typography>

            <Box position="relative" display="flex" alignItems="center">
              <Button
                onClick={() => scroll(-300)}
                style={{ position: 'absolute', left: 0, zIndex: 1, backgroundColor: 'white', minWidth: '40px' }}
              >
                <ArrowBackIosIcon />
              </Button>

              <Box
                ref={containerRef}
                display="flex"
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': { display: 'none' }, // Ocultar scrollbar
                }}
              >
                {data.map((product, index) => (
                  <Card
                    key={index}
                    sx={{
                      minWidth: 250,
                      margin: '0 16px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.img}
                      alt={product.title}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" align="center">
                        {product.title}
                      </Typography>
                      <Typography variant="body1" color="text.primary" align="center">
                        {product.price}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="center" pb={2}>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          fontWeight: 'bold',
                          width: '80%',
                        }}
                      >
                        ENTRAR
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Button
                onClick={() => scroll(300)}
                style={{ position: 'absolute', right: 0, zIndex: 1, backgroundColor: 'white', minWidth: '40px' }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Container>
          <Container sx={{ mt: 5 }}>
            <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
              SUbasta de Electronica:
            </Typography>

            <Box position="relative" display="flex" alignItems="center">
              <Button
                onClick={() => scroll(-300)}
                style={{ position: 'absolute', left: 0, zIndex: 1, backgroundColor: 'white', minWidth: '40px' }}
              >
                <ArrowBackIosIcon />
              </Button>

              <Box
                ref={containerRef}
                display="flex"
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {data.map((product, index) => (
                  <Card
                    key={index}
                    sx={{
                      minWidth: 250,
                      margin: '0 16px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.img}
                      alt={product.title}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" align="center">
                        {product.title}
                      </Typography>
                      <Typography variant="body1" color="text.primary" align="center">
                        {product.price}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="center" pb={2}>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          fontWeight: 'bold',
                          width: '80%',
                        }}
                      >
                        ENTRAR
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Button
                onClick={() => scroll(300)}
                style={{ position: 'absolute', right: 0, zIndex: 1, backgroundColor: 'white', minWidth: '40px' }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Container>
        </div>
      )}
    </>
  );
};

export default Dashboard;
