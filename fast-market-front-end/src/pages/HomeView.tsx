import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Subasta de productos
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Buscar productos..."
        fullWidth
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Silla de escritorio</Typography>
              <Typography color="text.secondary">MX$500</Typography>
              <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                Entrar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Silla de escritorio</Typography>
              <Typography color="text.secondary">MX$500</Typography>
              <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                Entrar
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default HomePage;
