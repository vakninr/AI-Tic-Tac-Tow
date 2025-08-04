import React, { useState } from 'react';
import styles from './HomeScreen.module.css';

const HomeScreen = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartGame = () => {
    if (!player1Name || !player2Name) {
      setErrorMessage('Please enter names for both players.');
      return;
    }
    setErrorMessage('');
    onStartGame(player1Name, player2Name);
  };

  return (
    <div className={styles.homeScreen}>
      <h1>Tic-Tac-Toe</h1>
      <div className={styles.inputContainer}>
        <label htmlFor="player1">Player 1 Name:</label>
        <input
          type="text"
          id="player1"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          placeholder="Enter Player 1 Name"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="player2">Player 2 Name:</label>
        <input
          type="text"
          id="player2"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          placeholder="Enter Player 2 Name"
        />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default HomeScreen;