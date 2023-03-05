import React, { useState } from "react";
import { Dialog } from '@mui/material';
import { TerritoryCard } from "../gameLogic/Models/TerritoryCard";
import TerritoryCardManager, { TradableCards } from "../gameLogic/Controllers/TerritoryCardManager";
import { Player } from "../gameLogic/Models/Player";

type Props = { 
  onClose: any, 
  cards: TerritoryCard[], 
  player: Player,
  updateGameState: any
}

export default function TerritoryCards(props: Props): JSX.Element {
  const [selectedCards, setSelectedCards] = useState<TerritoryCard[]>([]);

  function onCardSelect(card: TerritoryCard): void {
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
    TerritoryCardManager.exchangeCards(props.player, selectedCards as TradableCards);
    props.updateGameState();
    props.onClose();
  }

  const cards = props.cards.map((card, i) => {
    return <Card key={i} card={card} index={i} isSelected={selectedCards.includes(card)} onClick={() => onCardSelect(card)} />
  })

  return (
    <Dialog onClose={props.onClose} open={true} fullWidth maxWidth='sm' className='territory-cards'>
      <h1>Territory Cards</h1>
      <div className='territory-cards--list'>
        {cards}
      </div>
      <button disabled={!areSelectedCardsExchangeable()} onClick={tradeCards}>Exchange Cards</button>
    </Dialog>
  );
}

function Card(props: { card: TerritoryCard, index: number, isSelected: boolean, onClick: any }): JSX.Element {
  let className = 'territory-cards--card';

  if (props.isSelected) {
    className += ' selected';
  }

  return (
    <div className={className} key={props.index} onClick={props.onClick}>
      {props.card.getSymbolValue()}
    </div>
  );
}