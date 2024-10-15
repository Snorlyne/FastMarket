import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Avatar, Button } from '@mui/material';

/* Componentes */
import Header from '../components/Header';
import Loader from '../components/Loader';
import Menubelow from '../components/Menubelow';

const ViewProducto: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('karla');
  const [apellido, setApellido] = useState('Diaz');
  const [correo, setCorreo] = useState('karla@gmail.com');
  const [telefono, setTelefono] = useState('992288222');
  const [telefonoAlt, setTelefonoAlt] = useState('9282782');
  const [password, setPassword] = useState('');

  const handleSaveChanges = () => {
    alert('Cambios guardados');
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
          <Container style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom align="center">
              Perfil del usuario
            </Typography>

            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {/* Columna de la imagen */}
              <Grid item xs={12} sm={3} display="flex" justifyContent="center">
                <Avatar
                  alt="Imagen de perfil"
                  src="https://via.placeholder.com/150"
                  style={{ width: 150, height: 150 }}
                />
              </Grid>

              {/* Columna del formulario */}
              <Grid item xs={12} sm={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      variant="outlined"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      variant="outlined"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Correo"
                      variant="outlined"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contraseña"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      variant="outlined"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono alternativo"
                      variant="outlined"
                      value={telefonoAlt}
                      onChange={(e) => setTelefonoAlt(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleSaveChanges}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>

        </div>
      )}
    </>
  );
};

export default ViewProducto;
