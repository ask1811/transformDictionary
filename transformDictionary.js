function transformDictionary(D) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const transformedDict = {};

  // Sort the keys in ascending order
  const sortedKeys = Object.keys(D).sort();

  for (let i = 0; i < sortedKeys.length; i++) {
    const currentDate = new Date(sortedKeys[i]);
    const currentDateValue = D[sortedKeys[i]];
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

    if (i === 0) {
      transformedDict[currentDayOfWeek] = currentDateValue;
    } else {
      const prevDate = new Date(sortedKeys[i - 1]);
      const prevDayOfWeek = daysOfWeek[prevDate.getDay()];
      const prevDateValue = D[sortedKeys[i - 1]];
      const daysDifference = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

      if (daysDifference === 1) {
        transformedDict[currentDayOfWeek] = currentDateValue;
      } else {
        const valueDifference = currentDateValue - prevDateValue;
        const dailyIncrement = valueDifference / daysDifference;

        for (let j = 1; j < daysDifference; j++) {
          const missingDate = new Date(prevDate.getTime() + j * 24 * 60 * 60 * 1000);
          const missingDayOfWeek = daysOfWeek[missingDate.getDay()];
          const interpolatedValue = prevDateValue + dailyIncrement * j;
          transformedDict[missingDayOfWeek] = interpolatedValue;
        }
      }

      transformedDict[currentDayOfWeek] = currentDateValue;
    }
  }
  const sortedWeekDict = Object.fromEntries(
    Object.entries(transformedDict).sort((a, b) => a[1] - b[1])
  );
  return sortedWeekDict;
}

const inputDict = {
  '2020-01-01': 6,
  '2020-01-04': 12,
  '2020-01-05': 14,
  '2020-01-06': 2,
  '2020-01-07': 4
};
const outputDict = transformDictionary(inputDict);

console.log(outputDict);
