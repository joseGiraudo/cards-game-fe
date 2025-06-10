import React, { useEffect, useState } from 'react'
import type { Deck } from '../../models/card';
import * as cardService from '../../services/cardService';
import { Alert, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    <Typography variant="h5" gutterBottom>
        Mazos
    </Typography>
    
    {error ? (
        <Alert severity='error'>{error}</Alert>
    ) : (
        <Grid container spacing={3}>
            {decks.map((deck) => (
                <Grid size={{ xs:12, sm:6, md:4 }}  key={deck.id}>
                <Card elevation={3}>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {deck.name}
                    </Typography>
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
    )}
    </>
  )
}

export default DeckList