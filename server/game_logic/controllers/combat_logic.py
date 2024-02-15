from game_logic.models.Area import Area
from game_logic.models.Game import Game
from typing import List
import random

def is_combat_valid(attacking_area: Area, attacking_dice: int) -> bool:
    MAX_ALLOWED_ATTACKING_DICE = 3
    return (
        attacking_area.units > attacking_dice and
        attacking_dice <= MAX_ALLOWED_ATTACKING_DICE and
        attacking_dice > 0
    )

class CombatController():
    def __init__(self, attacking_area: Area, defending_area: Area, game: Game):
        self.attacking_area = attacking_area
        self.defending_area = defending_area
        self.game = game
        
    def process_combat(self, attacking_dice: int):
        results = self.get_combat_results(attacking_dice)
        self.handle_results(results)

    def get_combat_results(self, attacking_dice: int) -> List[str]:
        defending_dice = self.get_max_defending_dice(attacking_dice)
        attacker_rolls = self.roll_dice(attacking_dice)
        defender_rolls = self.roll_dice(defending_dice)
        
        results = []
        first_result = self.first_dice_combat(attacker_rolls[0], defender_rolls[0])
        results.append(first_result)
        
        if defending_dice > 1:
            second_result = self.second_dice_combat(attacker_rolls[1], defender_rolls[1])
            results.append(second_result)
        
        return results
    
    def get_max_defending_dice(self, attacking_dice: int) -> int:
        MAX_ALLOWED_DEFENDING_DICE = 2
        return min(attacking_dice, self.defending_area.units, MAX_ALLOWED_DEFENDING_DICE)
    
    def roll_dice(self, num_dice: int) -> List[int]:
        rolls = [random.randint(1, 6) for _ in range(num_dice)]
        rolls.sort(reverse=True)
        return rolls
        
    def first_dice_combat(self, attacking_roll: int, defending_roll) -> str:
        attacking_bonus = self.get_attacker_bonus()
        defending_bonus = self.get_defender_bonus()
        attacking_score = min(attacking_roll + attacking_bonus, 6)
        defending_score = min(defending_roll + defending_bonus, 6)
        
        return "attacker" if attacking_score > defending_score else "defender"
        
    def get_defender_bonus(self) -> int:
        bonus = 0 
        bonus += self.defending_area.defending_bonus
        
        if self.defending_area.has_leader:
            bonus += 1
        
        return bonus
    
    def get_attacker_bonus(self) -> int:
        return 1 if self.attacking_area.has_leader else 0
    
    def second_dice_combat(self, attacking_roll: int, defending_roll: int) -> str:
        return "attacker" if attacking_roll > defending_roll else "defender"
        
    def handle_results(self, results: List[str]):
        for r in results:
            if r == "attacker":
                self.remove_unit(self.defending_area)
            else:
                self.remove_unit(self.attacking_area)
                
        if self.defending_area.units < 1:
            self.game.handle_capturing_area(self.attacking_area.player, self.defending_area)
    
    def remove_unit(self, area: Area):
        area.player.units -= 1
        area.units -= 1