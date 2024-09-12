const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getUniqueOrdering = (array) => {
  const shuffledArray = shuffleArray(array.slice());

  for (let i = 1; i < shuffledArray.length; i++) {
    if (shuffledArray[i].color === shuffledArray[i - 1].color) {
      // Найти элемент с другим цветом
      let swapIndex = i + 1;
      while (
        swapIndex < shuffledArray.length &&
        shuffledArray[swapIndex].color === shuffledArray[i].color
      ) {
        swapIndex++;
      }

      // Если нашли элемент для замены, переставляем их
      if (swapIndex < shuffledArray.length) {
        [shuffledArray[i], shuffledArray[swapIndex]] = [
          shuffledArray[swapIndex],
          shuffledArray[i],
        ];
      }
    }
  }

  return shuffledArray;
};
