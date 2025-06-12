import React, { useEffect, useState } from 'react'
import type { Deck } from '../../models/card';
import * as cardService from '../../services/cardService';
import { Alert, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline, ViewCarousel } from '@mui/icons-material';

const DeckList = () => {

    const navigate = useNavigate();

    const [decks, setDecks] = useState<Deck[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(()=> {
        fetchDecks();
    }, [])


    const fetchDecks = async () => {
        try {
            const data = await cardService.getPlayerDecks();
            console.log(data)
            setDecks(data);
            setError(null)
            return
        } catch (error) {
            setError("No se pudieron obtener los mazos")
            console.error(error)
        }
    }
  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: 2, }}>
            <Typography variant="h5" gutterBottom sx={{mx: 5}}>
                Estos son tus mazos
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={() => navigate('/decks/new')}
            >
                Nuevo mazo
            </Button>
        </Box>
        <Divider sx={{my: 2}}/>
    
    {error ? (
        <Alert severity='error'>{error}</Alert>
    ) : decks.length === 0 ? (
        <Box component="section" 
            sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center', minHeight: '200px',
        }}>
            <Alert severity="info">Todavía no tenés mazos creados.</Alert>
            <Button
                variant="outlined"
                size="small"
                sx={{p:1, m:2}}
                onClick={() => navigate(`/decks/new`)}
            >Crear Mazo
            </Button>
        </Box>
      ) : (
        <Box sx={{m: 2}}>
            <Grid container spacing={3}>
                {decks.map((deck) => (
                    <Grid size={{ xs:12, sm:6, md:4 }}  key={deck.id}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={1}>
                                <ViewCarousel sx={{ mr: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                {deck.name}
                                </Typography>
                            </Box>
                            {/* Esto deberia mostrarlo pero por como funciona el backend lo saque */}
                            {/* 
                            <Typography variant="body1" gutterBottom>
                                Cartas: {deck.cards?.length}
                            </Typography>
                            */}
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/decks/${deck.id}`)}
                            >
                                Ver Cartas
                            </Button>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )}
    </>
  )
}

export default DeckList