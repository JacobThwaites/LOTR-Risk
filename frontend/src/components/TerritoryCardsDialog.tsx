import React, { useState } from "react";
import { Dialog, DialogContent } from '@mui/material';
import TerritoryCardManager, { TradableCards } from "../gameLogic/Controllers/TerritoryCardManager";
import CustomButton from "./common/CustomButton";
import TerritoryCard from "./TerritoryCard";

type Props = { 
  onClose: any, 
  cards: string[],
  sendTradeTerritoryCardsMessage(selectedCards: string[]): void
}

export default function TerritoryCardsDialog(props: Props): JSX.Element {
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  const selectedCards = props.cards.filter((card, i) => selectedCardIndexes.includes(i));

  function onCardSelect(index: number): void {
    if (selectedCardIndexes.includes(index)) {
      const newCardIndexes = selectedCardIndexes.filter(i => i !== index);
      setSelectedCardIndexes(newCardIndexes);
    } else {
      const card = props.cards[index];
      if (TerritoryCardManager.isNewCardValidWithExistingCards(selectedCards, card)) {
        setSelectedCardIndexes([...selectedCardIndexes, index]);
      }
    }
  }

  function areSelectedCardsExchangeable(): boolean {
    return selectedCardIndexes.length === 3 && TerritoryCardManager.areCardsExchangeable(selectedCards as TradableCards);
  }

  function tradeCards(): void {
    props.sendTradeTerritoryCardsMessage(selectedCards);
    props.onClose();
  }

  const cards = props.cards.map((card, i) => {
    return <TerritoryCard key={i} card={card} index={i} isSelected={selectedCardIndexes.includes(i)} onClick={() => onCardSelect(i)} />
  })

  return (
    <Dialog onClose={props.onClose} open={true} fullWidth maxWidth='sm' className='territory-cards' scroll='paper' data-testid='territory-cards'>
      <h1 className='territory-cards--header'>Territory Cards</h1>
      <DialogContent>
        <div className='territory-cards--list'>
          {cards}
        </div>
      </DialogContent>
      <CustomButton id='territory-cards--button' onClick={tradeCards} label='Exchange Cards' disabled={!areSelectedCardsExchangeable()} />
    </Dialog>
  );
}