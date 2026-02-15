import React from "react";
import eagle from '../assets/eagle.svg';
import nazgul from '../assets/nazgul.png';
import archer from '../assets/archer.svg';
import wildCard from '../assets/wild-card.png';

export default function TerritoryCard(props: { card: string, index: number, isSelected: boolean, onClick: any }): JSX.Element {
    let className = 'territory-cards--card';
  
    if (props.isSelected) {
      className += ' selected';
    }
  
    function getImageSource(symbol: string): string {
      if (symbol === "ARCHER") {
        return archer;
      } else if (symbol === "CAVALRY") {
        return nazgul;
      } else if (symbol === "EAGLE") {
        return eagle;
      } else {
        return wildCard;
      }
    }
  
    return (
      <div className={className} key={props.index} onClick={props.onClick} data-testid={className}>
        <div className='territory-card--card_symbol'>
          <img className={`symbol-${props.card}`} src={getImageSource(props.card)} alt={props.card}/>
        </div>
        <p>
          {props.card}
        </p>
      </div>
    );
  }