import Home from './components/Home'
import './App.css'

function App() {
  const handleStartGame = (player1Name: string, player2Name: string) => {
    console.log(`Starting game with ${player1Name} and ${player2Name}`);
    // TODO: Implement game logic here
  };

  return (
    <div className="App">
      <Home onStartGame={handleStartGame} />
    </div>
  )
}

export default App
