import React from 'react'
import { Card as MUICard, CardContent, Typography, Box } from '@mui/material'
import type { Card as CardModel } from '../../models/card'

interface Props {
  card: CardModel
}

const CardItem: React.FC<Props> = ({ card }) => {
  return (
    <MUICard sx={{ width: 250, m: 1, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="body2">Ataque: {card.attack}</Typography>
        <Typography variant="body2">Defensa: {card.defense}</Typography>
        <Box
            component="img"
            sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt={card.illustration}
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            // src={card.illustration}
        />
      </CardContent>
    </MUICard>
  )
}

export default CardItem
