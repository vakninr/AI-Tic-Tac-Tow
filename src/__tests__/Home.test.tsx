import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Component', () => {
  it('renders two input fields and a start game button', () => {
    render(<Home />);
    
    expect(screen.getByLabelText(/player 1 name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/player 2 name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });

  it('shows validation errors when trying to start game with empty names', () => {
    render(<Home />);
    
    const startButton = screen.getByRole('button', { name: /start game/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText(/player 1 name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/player 2 name is required/i)).toBeInTheDocument();
  });

  it('clears validation errors when typing in inputs', () => {
    render(<Home />);
    
    const startButton = screen.getByRole('button', { name: /start game/i });
    const player1Input = screen.getByLabelText(/player 1 name/i);
    
    // Trigger validation errors
    fireEvent.click(startButton);
    expect(screen.getByText(/player 1 name is required/i)).toBeInTheDocument();
    
    // Type in input
    fireEvent.change(player1Input, { target: { value: 'Alice' } });
    
    // Error should be cleared
    expect(screen.queryByText(/player 1 name is required/i)).not.toBeInTheDocument();
  });

  it('calls onStartGame with player names when validation passes', () => {
    const mockOnStartGame = vi.fn();
    render(<Home onStartGame={mockOnStartGame} />);
    
    const player1Input = screen.getByLabelText(/player 1 name/i);
    const player2Input = screen.getByLabelText(/player 2 name/i);
    const startButton = screen.getByRole('button', { name: /start game/i });
    
    fireEvent.change(player1Input, { target: { value: 'Alice' } });
    fireEvent.change(player2Input, { target: { value: 'Bob' } });
    fireEvent.click(startButton);
    
    expect(mockOnStartGame).toHaveBeenCalledWith('Alice', 'Bob');
  });

  it('trims whitespace from player names', () => {
    const mockOnStartGame = vi.fn();
    render(<Home onStartGame={mockOnStartGame} />);
    
    const player1Input = screen.getByLabelText(/player 1 name/i);
    const player2Input = screen.getByLabelText(/player 2 name/i);
    const startButton = screen.getByRole('button', { name: /start game/i });
    
    fireEvent.change(player1Input, { target: { value: '  Alice  ' } });
    fireEvent.change(player2Input, { target: { value: '  Bob  ' } });
    fireEvent.click(startButton);
    
    expect(mockOnStartGame).toHaveBeenCalledWith('Alice', 'Bob');
  });
});