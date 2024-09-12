import { useState, useEffect } from "react";
import { getElementsByRate } from "../utils/getElementsByRate";
import { getUniqueOrdering } from "../utils/getUniqueOrdering";

const Roulette = ({ elements }) => {
  const [weightedArray, setWeightedArray] = useState(
    getElementsByRate(elements)
  );
  const [rearrangedByColor, setRearrangedByColor] = useState(
    getUniqueOrdering(weightedArray)
  );
  const [double, setDouble] = useState([]);
  const [shiftNumber, setShiftNumber] = useState(0);
  const [selectColor, setSelectColor] = useState("");
  const [spinDuration, setSpinDuration] = useState(1);
  const [arr, setArr] = useState([]);

  // Чтобы увеличивать длину массива в зависимости от времени массива, чтобы скорость прокрутки оставалась такой же
  useEffect(() => {
    setArr(Array.from({ length: spinDuration | 1 }, () => double).flat());
  }, [spinDuration, selectColor]);

  useEffect(() => {
    setDouble([...rearrangedByColor, ...rearrangedByColor]);
    setArr([...rearrangedByColor, ...rearrangedByColor]);
  }, [rearrangedByColor]);

  // Прокрутка до рандомного элемента или до определенного цвета (если мы выбрали)
  const randomShift = () => {
    const index = rearrangedByColor.findIndex(
      (elem) => elem.color === selectColor
    );

    if (spinDuration !== 0) {
      setShiftNumber(index - 2 + 18 * spinDuration);
    } else {
      setShiftNumber(index - 2 + 18);
    }
  };

  const restartFun = () => {
    setShiftNumber(0);
    setWeightedArray(getElementsByRate(elements));
    setRearrangedByColor(getUniqueOrdering(weightedArray));
    setSelectColor("");
    setShiftNumber(0);
    setSpinDuration(1);
  };

  return (
    <div>
      <div className="roulette__row">
        {arr.map((item, index) => (
          <div
            key={index}
            className="roulette__item"
            style={{
              backgroundColor: item.color,
              transform: `translateX(${-shiftNumber * 110}px)`,
              transition: `transform ${
                shiftNumber === 0 ? 0 : +spinDuration
              }s linear`,
            }}
          ></div>
        ))}
        <div className="roulette__arrow"></div>
      </div>

      {/* Начать прокрутку */}
      <button onClick={randomShift} disabled={shiftNumber}>
        Начать прокрутку
      </button>

      {/* Restart */}
      <button onClick={restartFun} disabled={!shiftNumber}>
        restart
      </button>

      {/* Выбрать цвет */}
      <p style={{ marginTop: "30px" }}>Выберите Цвет</p>
      <select
        value={selectColor}
        onChange={(e) => setSelectColor(e.target.value)}
        disabled={shiftNumber}
      >
        <option value=""></option>
        {elements.map((item, index) => (
          <option key={index} value={item.color}>
            {item.color}
          </option>
        ))}
      </select>

      {/* Выбрать время прокрутки */}
      <p>Выберите длительность</p>
      <input
        value={spinDuration}
        onChange={(e) => setSpinDuration(e.target.value)}
        type="number"
        disabled={shiftNumber}
      />
    </div>
  );
};

export default Roulette;
