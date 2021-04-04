import React from "react";
import UnitInput from "./common/UnitInput";

type Props = {
  maxAttackingDice: number,
  attackingDice: number,
  onNumberSelect: Function,
  maxDefendingDice: number,
  defendingDice: number
}

export default function CombatInputs(props: Props) {
  return (
    <div className="combat-handler__dice-input">
      <div className="combat-handler__dice-input--attacking">
        <UnitInput
          label="Attacking Dice"
          name="attackingDice"
          max={props.maxAttackingDice}
          value={props.attackingDice}
          onChange={props.onNumberSelect}
        />
      </div>
      <div className="combat-handler__dice-input--defending">
        <UnitInput
          label="Defending Dice"
          name="defendingDice"
          max={props.maxDefendingDice}
          value={props.defendingDice}
          onChange={props.onNumberSelect}
        />
      </div>
    </div>
  );
}