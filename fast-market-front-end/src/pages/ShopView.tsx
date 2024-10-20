import React from 'react';
import { Box, Typography } from '@mui/material';

const ShopPage: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tienda
      </Typography>
      <Typography>
        Aquí puedes encontrar productos disponibles en la tienda.
      </Typography>
    </Box>
  );
};

export default ShopPage;
