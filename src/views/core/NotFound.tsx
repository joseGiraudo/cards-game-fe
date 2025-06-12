// src/pages/NotFound.tsx
import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => {
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
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" mb={3}>
        La página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Ir al inicio
      </Button>
    </Box>
  )
}

export default NotFound
