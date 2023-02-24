import React, { Dispatch, SetStateAction } from "react";
import UnitInput from "./common/UnitInput";

type Props = {
  maxAttackingDice: number,
  attackingDice: number,
  maxDefendingDice: number,
  defendingDice: number
  setAttackingDice: Dispatch<SetStateAction<number>>,
  setDefendingDice: Dispatch<SetStateAction<number>>,
  areInputsDisabled: boolean
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
          onChange={(num: number) => props.setAttackingDice(num)}
          disabled={!props.areInputsDisabled}
        />
      </div>
      <div className="combat-handler__dice-input--defending">
        <UnitInput
          label="Defending Dice"
          name="defendingDice"
          max={props.maxDefendingDice}
          value={props.defendingDice}
          onChange={(num: number) => props.setDefendingDice(num)}
          disabled={!props.areInputsDisabled}
        />
      </div>
    </div>
  );
}