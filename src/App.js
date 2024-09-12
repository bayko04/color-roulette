import React from "react";
import "./App.css";
import Roulette from "./components/Roulette";

export default function App() {
  const elements = [
    { color: "red", rating: 5 },
    { color: "yellow", rating: 3 },
    { color: "blue", rating: 2 },
    { color: "orange", rating: 4 },
    { color: "pink", rating: 1 },
    { color: "green", rating: 3 },
  ];

  return (
    <div className="App">
      <h1>Рулетка</h1>
      <Roulette elements={elements} />
    </div>
  );
}
