import { CheckCircleOutline, Error, QuestionMark, Warning } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'


interface ConfirmDialogProps {
  open: boolean;
  mode: 'confirm' | 'success' | 'alert' | 'error';
  title: string;
  onClose: () => void;
  onSuccess?: () => void;
}


const ConfirmDialog : React.FC<ConfirmDialogProps> = ({ open, mode, title, onClose, onSuccess }) => {
  

    const getIcon = () => {
        switch (mode) {
        case "confirm":
            return <QuestionMark color="primary" fontSize="large" />;
        case "success":
            return <CheckCircleOutline color="success" fontSize="large" />;
        case "alert":
            return <Warning color="warning" fontSize="large" />;
        case "error":
            return <Error color="error" fontSize="large" />;
        default:
            return null;
        }
    };
  
  
    return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogContent>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                {getIcon()}
                <DialogTitle>{title}</DialogTitle>
            </Box>
      </DialogContent>
      <DialogActions>
        {mode === 'confirm' ? (
          <>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onSuccess} variant="contained" color="primary">
              Confirmar
            </Button>
          </>
        ) : (
          <Button onClick={onClose} autoFocus variant="outlined">
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog