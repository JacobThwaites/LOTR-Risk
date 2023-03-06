import React, { useState } from "react";
import { Dialog, DialogContent } from '@mui/material';
import { TerritoryCard } from "../gameLogic/Models/TerritoryCard";
import TerritoryCardManager, { TradableCards } from "../gameLogic/Controllers/TerritoryCardManager";
import { Player } from "../gameLogic/Models/Player";
import { Symbol } from "../gameLogic/Enums/Symbols";
import eagle from '../assets/eagle.svg';
import nazgul from '../assets/nazgul.png';
import archer from '../assets/archer.svg';


type Props = { 
  onClose: any, 
  cards: TerritoryCard[], 
  player: Player,
  updateGameState: any
}

export default function TerritoryCardsDialog(props: Props): JSX.Element {
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
    <Dialog onClose={props.onClose} open={true} fullWidth maxWidth='sm' className='territory-cards' scroll='paper'>
      <h1 className='territory-cards--header'>Territory Cards</h1>
      <DialogContent>
        <div className='territory-cards--list'>
          {cards}
        </div>
      </DialogContent>
      <button className='territory-cards--button' disabled={!areSelectedCardsExchangeable()} onClick={tradeCards}>Exchange Cards</button>
    </Dialog>
  );
}

function Card(props: { card: TerritoryCard, index: number, isSelected: boolean, onClick: any }): JSX.Element {
  let className = 'territory-cards--card';

  if (props.isSelected) {
    className += ' selected';
  }

  function getImageSource(symbol: Symbol): string {
    if (symbol === Symbol.ARCHER) {
      return archer;
    } else if (symbol === Symbol.CAVALRY) {
      return nazgul;
    } else if (symbol === Symbol.EAGLE) {
      return eagle;
    } else {
      return 'wild card';
    }
  }

  const symbol = props.card.getSymbolValue();
  return (
    <div className={className} key={props.index} onClick={props.onClick}>
      <div className='territory-card--card_symbol'>
        <img src={getImageSource(symbol)} alt={symbol}/>
      </div>
      {symbol}
    </div>
  );
}