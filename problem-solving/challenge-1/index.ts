export const numbersFractionCalculator = (numbers: number[]) => {
  let negatives = 0;
  let positives = 0;
  let zeros = 0;

  numbers.forEach((number) => {
    if (number < 0) {
      negatives++;
    }
    if (number > 0) {
      positives++;
    }
    if (number == 0) {
      zeros++;
    }
  });

  return {
    positives: (positives / numbers.length).toFixed(6),
    negative: (negatives / numbers.length).toFixed(6),
    zeros: (zeros / numbers.length).toFixed(6),
  };
};
