import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { AssignCardDTO, Card, Deck } from '../../models/card';
import * as cardService from '../../services/cardService';
import { Alert, Box, Button, Card as CardMUI, CardContent, Checkbox, CircularProgress, FormControlLabel, Grid, Typography } from '@mui/material';
import CardItem from '../../components/card/CardItem';

const DeckView = () => {
  const { deckId } = useParams();

  const cardDTO: AssignCardDTO = {
    cardIds: []
  }

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {

    const fetchDeck = async () => {
        if(deckId) {
            try {
            const data = await cardService.getPlayerDeckCards(deckId);
            setDeck(data);
            console.log(data);
            
          } catch (err: unknown) {
            console.error(err);
            setError('Error al cargar el mazo.');
          } finally {
            setLoading(false);
          }
        }
    }

    const fetchCards = async () => {
      try {
        const data = await cardService.getAll(); // debe retornar todas las cartas posibles
        setCards(data);
      } catch (err: unknown) {
        console.error(err);
        setError('Error al cargar las cartas.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
    fetchCards();

    console.log(deck)
  }, [deckId]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!deckId) return;

    if (selectedIds.length < 8 || selectedIds.length > 15) {
      setSubmitError('Seleccioná entre 8 y 15 cartas.');
      return;
    }

    

    try {
      cardDTO.cardIds = selectedIds;
      await cardService.assignCardsToDeck(Number(deckId), cardDTO);
      setSuccess(true);
      setSubmitError(null);
    } catch (err: unknown) {
        console.error(err);
      setSubmitError('No se pudieron asignar las cartas.');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
        <CardMUI elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                  {deck?.name}
              </Typography>
              <Grid container spacing={1}>
                  {deck?.cards.map((card) => (
                  <Grid size={{ xs:12, sm:6, md:4, lg:3}} key={card.id}>
                      <CardItem card={card} />
                  </Grid>
                  ))}
              </Grid>
            </CardContent>
        </CardMUI>


        {deck?.cards.length === 0 ? (
          <Grid>
              <Box sx={{m:2}}>
                <Typography variant="h5" gutterBottom>
                Asignar Cartas al Mazo
                </Typography>

                <Typography variant="body2" gutterBottom color="text.secondary">
                Seleccioná entre 8 y 15 cartas para el mazo.
                </Typography>
              </Box>

              {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>Cartas asignadas exitosamente.</Alert>}

              <Grid container spacing={2} justifyContent="center">
                  {cards.map((card) => (
                      <Box display="flex" flexDirection="column" alignItems="center" sx={{my:1}}>
                        <Box onClick={() => toggleSelection(card.id)} sx={{cursor: 'pointer'}}>
                          <CardItem card={card} />
                        </Box>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={selectedIds.includes(card.id)}
                                onChange={() => toggleSelection(card.id)}
                            />
                            }
                            label={card.name}
                        />
                      </Box>
                  ))}
              </Grid>

              <Box sx={{ mt: 3 }}>
                  <Button
                      variant="contained"
                      size='large'
                      onClick={handleSubmit}
                      sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                      }}
                  >
                      Guardar Selección ({selectedIds.length})
                  </Button>
              </Box>
          </Grid>
          ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
              Este mazo ya tiene cartas asignadas.
          </Typography>
        )}

    </Box>
  )
}

export default DeckView