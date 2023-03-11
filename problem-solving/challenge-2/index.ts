export const diceFacesCalculator = (
  dice1: number,
  dice2: number,
  dice3: number,
): number => {
  const dices = [dice1, dice2, dice3];

  dices.forEach((dice) => {
    if (dice < 1 || dice > 6) throw 'Dice out of number range';
  });

  let repeatedDice: number | null = null;
  let repeatedTimes: number = 1;

  if (dice1 === dice2) {
    repeatedDice = dice1;
    repeatedTimes++;
  }
  if (dice1 === dice3) {
    repeatedDice = dice1;
    repeatedTimes++;
  }
  if (dice2 === dice3) {
    repeatedDice = dice2;
    repeatedTimes++;
  }
  if (dice1 === dice2 && dice2 === dice3) {
    repeatedTimes--;
  }

  if (repeatedDice) return repeatedDice * repeatedTimes;

  return dices.reduce((acc, number) => {
    return number > acc ? number : acc;
  });
};
