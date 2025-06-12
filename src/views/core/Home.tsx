import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();


  console.log("usuario: ", user);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido {user?.name}
        </Typography>
        <Typography variant="subtitle1">Campeonato de Cartas 2025</Typography>
        {user?.role === 4 && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button variant="contained" color="primary" onClick={() => navigate('/cards')}>
              Ver Cartas
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/decks')}>
              Ver Mazos
            </Button>
            <Button variant="contained" color="success" onClick={() => navigate('/tournaments')}>
              Inscribirme a un Torneo
            </Button>
          </Stack>
        )}

        {user?.role === 1 && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button variant="contained" color="primary" onClick={() => navigate('/cards')}>
              Ver Cartas
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/users')}>
              Ver Usuarios
            </Button>
            <Button variant="contained" color="success" onClick={() => navigate('/tournaments')}>
              Ver Torneos
            </Button>
          </Stack>
        )}

      </Box>
    </Container>
  );
};

export default Home;
