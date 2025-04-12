import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateTaskCard } from '../../components/CreateTaskCard';

describe('CreateTaskCard Theme Functionality', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  test('renders with blue theme by default', () => {
    render(
      <CreateTaskCard 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    const card = screen.getByText('Create New Task').closest('div');
    expect(card).toHaveClass('bg-blue-400/40');
    expect(card).toHaveClass('border-blue-400');
    expect(card).toHaveClass('text-blue-700');
  });
  
  test('renders with orange theme when specified', () => {
    render(
      <CreateTaskCard 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        theme="orange" 
      />
    );
    
    const card = screen.getByText('Create New Task').closest('div');
    expect(card).toHaveClass('bg-orange-400/40');
    expect(card).toHaveClass('border-orange-400');
    expect(card).toHaveClass('text-orange-700');
  });
  
  test('renders with pink theme when specified', () => {
    render(
      <CreateTaskCard 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        theme="pink" 
      />
    );
    
    const card = screen.getByText('Create New Task').closest('div');
    expect(card).toHaveClass('bg-pink-400/40');
    expect(card).toHaveClass('border-pink-400');
    expect(card).toHaveClass('text-pink-700');
  });
}); 