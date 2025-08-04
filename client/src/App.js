import React from 'react';
import Board from './Board';
import Menu from './Menu';
import WinningScreen from './WinningScreen';

function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Menu />
      <Board />
      <WinningScreen />
    </div>
  );
}

export default App;