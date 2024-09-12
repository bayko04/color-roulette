export const getElementsByRate = (elements) => {
  return elements.reduce((arr, elem) => {
    for (let i = 0; i < elem.rating; i++) {
      arr.push(elem);
    }
    return arr;
  }, []);
};
