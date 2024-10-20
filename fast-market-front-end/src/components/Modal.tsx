import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "info" | "success" | "warning" | "error"; // Tipos de modal
  title: string;
  message: string;
  onConfirm?: () => void; // Acción opcional en caso de confirmación
}

const Modal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
}) => {
  const getColor = () => {
    switch (type) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "info"; // Por defecto 'info'
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle color={getColor()}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions>
        {onConfirm && (
          <Button
            variant="text"
            color="primary"
            onClick={onConfirm}
            sx={{ marginRight: 2 }}
            size="small"
          >
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
