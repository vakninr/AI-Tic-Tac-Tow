import { useState } from 'react';
import './Home.css';

interface HomeProps {
  onStartGame?: (player1Name: string, player2Name: string) => void;
}

const Home: React.FC<HomeProps> = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [errors, setErrors] = useState({
    player1: '',
    player2: ''
  });

  const validateInputs = () => {
    const newErrors = {
      player1: '',
      player2: ''
    };

    if (!player1Name.trim()) {
      newErrors.player1 = 'Player 1 name is required';
    }

    if (!player2Name.trim()) {
      newErrors.player2 = 'Player 2 name is required';
    }

    setErrors(newErrors);
    return !newErrors.player1 && !newErrors.player2;
  };

  const handleStartGame = () => {
    if (validateInputs()) {
      onStartGame?.(player1Name.trim(), player2Name.trim());
    }
  };

  const handlePlayer1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(e.target.value);
    if (errors.player1) {
      setErrors(prev => ({ ...prev, player1: '' }));
    }
  };

  const handlePlayer2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(e.target.value);
    if (errors.player2) {
      setErrors(prev => ({ ...prev, player2: '' }));
    }
  };

  return (
    <div className="home-container">
      <h1>AI Tic Tac Toe</h1>
      <div className="player-inputs">
        <div className="input-group">
          <label htmlFor="player1">Player 1 Name:</label>
          <input
            id="player1"
            type="text"
            value={player1Name}
            onChange={handlePlayer1Change}
            placeholder="Enter Player 1 name"
            className={errors.player1 ? 'error' : ''}
          />
          {errors.player1 && <span className="error-message">{errors.player1}</span>}
        </div>
        
        <div className="input-group">
          <label htmlFor="player2">Player 2 Name:</label>
          <input
            id="player2"
            type="text"
            value={player2Name}
            onChange={handlePlayer2Change}
            placeholder="Enter Player 2 name"
            className={errors.player2 ? 'error' : ''}
          />
          {errors.player2 && <span className="error-message">{errors.player2}</span>}
        </div>
      </div>
      
      <button 
        className="start-game-btn"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;