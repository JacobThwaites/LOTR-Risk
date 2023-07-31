import React, { useState } from "react";
import { Dialog, DialogContent } from '@mui/material';
import { TerritoryCard as TerritoryCardModel } from "../gameLogic/Models/TerritoryCard";
import TerritoryCardManager, { TradableCards } from "../gameLogic/Controllers/TerritoryCardManager";
import CustomButton from "./common/CustomButton";
import TerritoryCard from "./TerritoryCard";

type Props = { 
  onClose: any, 
  cards: TerritoryCardModel[],
  sendTradeTerritoryCardsMessage(selectedCards: TerritoryCardModel[]): void
}

export default function TerritoryCardsDialog(props: Props): JSX.Element {
  const [selectedCards, setSelectedCards] = useState<TerritoryCardModel[]>([]);

  function onCardSelect(card: TerritoryCardModel): void {
    if (selectedCards.includes(card)) {
      const newCards = selectedCards.filter(c => c !== card);
      setSelectedCards(newCards);
    } else if (TerritoryCardManager.isNewCardValidWithExistingCards(selectedCards, card)) {
      setSelectedCards([...selectedCards, card]);
    }
  }

  function areSelectedCardsExchangeable(): boolean {
    return selectedCards.length === 3 && TerritoryCardManager.areCardsExchangeable(selectedCards as TradableCards);
  }

  function tradeCards(): void {
    props.sendTradeTerritoryCardsMessage(selectedCards);
    props.onClose();
  }

  const cards = props.cards.map((card, i) => {
    return <TerritoryCard key={i} card={card} index={i} isSelected={selectedCards.includes(card)} onClick={() => onCardSelect(card)} />
  })

  return (
    <Dialog onClose={props.onClose} open={true} fullWidth maxWidth='sm' className='territory-cards' scroll='paper'>
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