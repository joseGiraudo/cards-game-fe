import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
    >
      <Typography variant="h2" gutterBottom>
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Acceso no autorizado
      </Typography>
      <Typography variant="body1" mb={3}>
        No tienes permisos para ver estapágina
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Ir al inicio
      </Button>
    </Box>
  )
}

export default Unauthorized