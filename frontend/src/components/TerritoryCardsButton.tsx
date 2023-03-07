import React from "react";
import BlankCards from "../assets/blank-cards.svg";
import CustomButton from "./common/CustomButton";

export default function TerritoryCardsButton(props: { onClick: any, numCards: number }): JSX.Element {
    const label = (
        <>
            <img id='show-territory-cards-button--img' src={BlankCards} alt="asdf"/>
            <div id='show-territory-cards-button--num-cards'>{props.numCards}</div>
        </>
    )
    return (
        <CustomButton id='show-territory-cards-button' onClick={props.onClick} label={label} title='Territory Cards'/>
    )
}