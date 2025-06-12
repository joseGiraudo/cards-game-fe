import React from 'react'
import { Card as MUICard, CardContent, Typography, Box, CardMedia } from '@mui/material'
import type { Card as CardModel } from '../../models/card'

interface Props {
  card: CardModel
}

const CardItem: React.FC<Props> = ({ card }) => {
  return (
    <MUICard
      sx={{
        width: 250,
        mx:2,
        borderRadius: 4,
        boxShadow: 6,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 10,
        },
        background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
      }}
    >
      <CardMedia
        component="img"
        height="160"
        // image={card.illustration}
        image={"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"}
        alt={card.name}
        sx={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {card.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" px={1}>
          <Typography variant="body2" color="text.secondary">
            🗡️ Ataque: {card.attack}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🛡️ Defensa: {card.defense}
          </Typography>
        </Box>
      </CardContent>
    </MUICard>
  )
}

export default CardItem
