import React, { useEffect, useState } from 'react'
import type { Card } from '../../models/card';
import * as cardService from '../../services/cardService';
import CardItem from '../../components/card/CardItem';
import { Grid, Typography } from '@mui/material';

const CardList = () => {

    const [cards, setCards] = useState<Card[]>([]);

    useEffect(()=> {
        fetchCards();
    }, [])


    const fetchCards = async () => {
        try {
            const data = await cardService.getAll();
            console.log(data)
            setCards(data);
            return
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <Grid>
        <Typography variant='h5' sx={{m:2}}>Listado de Cartas</Typography>
        
        <Grid container>
            {cards.map(card => (
                <Grid key={card.id} size={{ xs:12, sm:6, md:4, lg:3}} sx={{my:2}}>
                    <CardItem card={card} />
                </Grid>
            ))}
        </Grid>
    </Grid>
  )
}

export default CardList