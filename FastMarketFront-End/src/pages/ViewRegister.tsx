import React, { useState } from "react";
import { TextField, Container, Typography, Box, Paper, } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./CSS/Login.css";

const ViewRegister: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();

    const handleRegister = () => {
        history.push("/Dashboard");
    };

    return (
        <Box
            sx={{
                backgroundColor: "#2d2d2d",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{ padding: 4, borderRadius: "20px", overflow: "hidden" }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h4" gutterBottom  sx={{fontWeight: 'bold'}}>
                            FastMarket
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            ¡Crea tu cuenta!
                        </Typography>

                        <TextField
                            label="Nombre"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Apellidos"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Número de Teléfono"
                            type="tel"
                            fullWidth
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 4 }}
                        />

                        <button className="button-login" style={{ width: '100%', maxWidth: '320px' }} onClick={handleRegister}>
                            <span style={{ margin: '0 auto' }}> Crear cuenta </span>
                        </button>
                        <Typography className='p' sx={{ mt: 2 }}>
                            ¿Ya tienes cuenta?                            
                            <span
                                onClick={() => history.push('/login')}
                                className='span'>
                                Inicia sesión
                            </span>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ViewRegister;
