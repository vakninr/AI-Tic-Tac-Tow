import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeScreen from './HomeScreen';

describe('HomeScreen Component', () => {
  const mockOnStartGame = jest.fn();

  it('should render the component with input fields and a start button', () => {
    render(<HomeScreen onStartGame={mockOnStartGame} />);
    expect(screen.getByLabelText('Player 1 Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Player 2 Name:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
  });

  it('should display an error message if the player tries to start the game without entering names', () => {
    render(<HomeScreen onStartGame={mockOnStartGame} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
    expect(screen.getByText('Please enter names for both players.')).toBeInTheDocument();
  });

  it('should call the onStartGame function with the player names when the form is submitted with valid input', () => {
    render(<HomeScreen onStartGame={mockOnStartGame} />);
    const player1Input = screen.getByLabelText('Player 1 Name:');
    const player2Input = screen.getByLabelText('Player 2 Name:');
    fireEvent.change(player1Input, { target: { value: 'Player 1' } });
    fireEvent.change(player2Input, { target: { value: 'Player 2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
    expect(mockOnStartGame).toHaveBeenCalledWith('Player 1', 'Player 2');
  });

  it('should clear the error message when valid input is provided', () => {
    render(<HomeScreen onStartGame={mockOnStartGame} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
    expect(screen.getByText('Please enter names for both players.')).toBeInTheDocument();
    const player1Input = screen.getByLabelText('Player 1 Name:');
    const player2Input = screen.getByLabelText('Player 2 Name:');
    fireEvent.change(player1Input, { target: { value: 'Player 1' } });
    fireEvent.change(player2Input, { target: { value: 'Player 2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
    expect(screen.queryByText('Please enter names for both players.')).toBeNull();
  });
});