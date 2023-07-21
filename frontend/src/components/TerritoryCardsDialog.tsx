import React, { useState } from "react";
import { Dialog, DialogContent } from '@mui/material';
import { TerritoryCard } from "../gameLogic/Models/TerritoryCard";
import TerritoryCardManager, { TradableCards } from "../gameLogic/Controllers/TerritoryCardManager";
import { Symbol } from "../gameLogic/Enums/Symbols";
import eagle from '../assets/eagle.svg';
import nazgul from '../assets/nazgul.png';
import archer from '../assets/archer.svg';
import wildCard from '../assets/wild-card.png';
import CustomButton from "./common/CustomButton";


type Props = { 
  onClose: any, 
  cards: TerritoryCard[]
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
    // TerritoryCardManager.exchangeCards(props.player, selectedCards as TradableCards);

    // TODO: send websocket message
    // props.updateGameState();
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
      <CustomButton id='territory-cards--button' onClick={tradeCards} label='Exchange Cards' disabled={!areSelectedCardsExchangeable()} />
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
      return wildCard;
    }
  }

  const symbol = props.card.getSymbolValue();
  return (
    <div className={className} key={props.index} onClick={props.onClick}>
      <div className='territory-card--card_symbol'>
        <img className={`symbol-${symbol}`} src={getImageSource(symbol)} alt={symbol}/>
      </div>
      <p>
        {symbol}
      </p>
    </div>
  );
}