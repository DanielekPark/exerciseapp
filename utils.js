//CALCULATES HEAVIEST WEIGHT USER CAN LIFT
const calcWeight = (exer, percentage) => {
  //Converts a string to a whole number
  const weight = Math.trunc(exer.weight / 1);
  const repetitions = Math.trunc(exer.reps / 1);
  if (weight < 1 || repetitions < 1) return;

  const oneRepMax = Math.round(weight / (1.0287 - (0.0278 * repetitions)));
  //SUGGESTED WEIGHT
  return Math.round((oneRepMax * percentage) / 5) * 5;
}


//SUGGESTED EXERCISE DATES
const exerciseDates = (days) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const futureTime = new Date(year, month, day + days);
  return `${futureTime.getMonth() + 1}/${futureTime.getDate()}`;
}

export { exerciseDates, calcWeight }