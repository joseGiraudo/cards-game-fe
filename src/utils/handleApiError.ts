import axios from 'axios'

export const handleApiError = (error: unknown, defaultMessage = 'Error inesperado'): Error => {
    
  if (axios.isAxiosError(error)) {
    // Sin respuesta
    if (!error.response) {
      return new Error('No se pudo conectar con el servidor.')
    }

    // Respuesta con mensaje personalizado del backend
    if (error.response.data?.message) {
      return new Error(error.response.data.message)
    }
  }

  return new Error(defaultMessage)
}
