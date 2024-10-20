import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import './CSS/Home.css'; 

import Header from '../components/Header';

const HomePage = () => {
  const history = useHistory();

  return (
    <>
          <Header/>

    <div className="product-auction-container">
      <Typography  align="center" gutterBottom sx={{color:'black', fontSize:'2rem'}}>
        Subasta de productos
      </Typography>

            <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$60</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth onClick={() => history.push('/ViewRegister')}  >
                ENTRAR
              </Button>
            </Card>

            <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>
            <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>
            <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>
            <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>   <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>   <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>   <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>   <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>   <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>   <Card className="auction-card">
              <div className="image-placeholder"></div> {/* Placeholder para la imagen */}
              <CardContent>
                <Typography variant="h6">Silla de escritorio</Typography>
                <Typography variant="subtitle1">MX$600</Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                ENTRAR
              </Button>
            </Card>
    </div>
    </>
  );
};

export default HomePage;
