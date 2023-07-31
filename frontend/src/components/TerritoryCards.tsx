import React from "react";
import { TerritoryCard as TerritoryCardModel } from "../gameLogic/Models/TerritoryCard";
import { Symbol } from "../gameLogic/Enums/Symbols";
import eagle from '../assets/eagle.svg';
import nazgul from '../assets/nazgul.png';
import archer from '../assets/archer.svg';
import wildCard from '../assets/wild-card.png';

export default function TerritoryCard(props: { card: TerritoryCardModel, index: number, isSelected: boolean, onClick: any }): JSX.Element {
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