import React, { useState } from "react";
import { TextField, Container, Typography, Box, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import { IRegistro } from "./../interfaces/IRegister";
import "./Login.css";
import { IResponse } from "../interfaces/IResponse";
import AuthService from "../services/AuthService";
import Modal from "../components/Modal"; // Asegúrate de importar el modal

const Register: React.FC = () => {
  const authService = AuthService;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
  const [modalData, setModalData] = useState({
    type: "info", // Por defecto
    title: "",
    message: "",
    onConfirm: () => {}, // Acción por defecto
  }); // Datos dinámicos del modal
  const history = useHistory();
  const handleRegister = async () => {
    try {
      const request: IRegistro = {
        correo: email,
        contraseña: password,
        nombre: firstName,
        apellido: lastName,
      };

      const response: IResponse = await authService.register(request);

      if (response.isSuccess) {
        // Modal de éxito
        setModalData({
          type: "success",
          title: "Registro Exitoso",
          message:
            "Tu cuenta ha sido creada exitosamente. Serás redirigido al inicio de sesión.",
          onConfirm: () => {
            history.push("/login"); // Redirige al login
          },
        });
      } else {
        // Modal de error
        setModalData({
          type: "error",
          title: "Error en el Registro",
          message:
            response.message ||
            "Hubo un problema al crear la cuenta. Inténtalo de nuevo.",
          onConfirm: () => {
            setIsModalOpen(false); // Solo cierra el modal
          },
        });
      }
    } catch (err) {
      // Modal para manejar errores de servidor o de conexión
      setModalData({
        type: "error",
        title: "Error",
        message:
          "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.",
        onConfirm: () => {
          setIsModalOpen(false); // Solo cierra el modal
        },
      });
    } finally {
      setIsModalOpen(true); // Abre el modal después de la respuesta o del error
    }
  };

  return (
    <>
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
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
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

              <button
                className="button-login"
                style={{ width: "100%", maxWidth: "320px" }}
                onClick={handleRegister}
              >
                <span style={{ margin: "0 auto" }}> Crear cuenta </span>
              </button>
              <Typography className="p" sx={{ mt: 2 }}>
                ¿Ya tienes cuenta?
                <span onClick={() => history.push("/login")} className="span">
                  Inicia sesión
                </span>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalData.type as any} // Pasando el tipo dinámico al modal
        title={modalData.title} // Pasando el título dinámico al modal
        message={modalData.message} // Pasando el mensaje dinámico al modal
        onConfirm={modalData.onConfirm} // Acción confirmación dinámica
      />
    </>
  );
};

export default Register;
