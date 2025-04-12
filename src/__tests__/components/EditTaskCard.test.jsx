import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditTaskCard } from '../../components/EditTaskCard';

describe('EditTaskCard Component', () => {
  // Sample test task for editing
  const testTask = {
    taskId: 'task-1',
    taskTitle: 'Test Task 1',
    taskDescription: 'Description 1',
    taskDate: '2023-05-01',
    taskPriority: 'High',
    taskStatus: false
  };

  // Mock callback functions
  const mockOnEdit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    render(
      <EditTaskCard
        onEdit={mockOnEdit}
        onCancel={mockOnCancel}
        currentTask={testTask}
        theme="blue"
      />
    );
  });

  test('renders with prefilled form fields from currentTask', () => {
    // Check that the component renders with the title
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    
    // Get inputs by their roles
    const inputs = screen.getAllByRole('textbox');
    const titleInput = inputs.find(input => input.value === 'Test Task 1');
    const dateInput = screen.getByDisplayValue('2023-05-01');
    const descInput = screen.getByDisplayValue('Description 1');
    const prioritySelect = screen.getByRole('combobox');
    
    // Check that form fields are prefilled with currentTask values
    expect(titleInput.value).toBe('Test Task 1');
    expect(dateInput.value).toBe('2023-05-01');
    expect(descInput.value).toBe('Description 1');
    
    // Check priority is set correctly
    expect(prioritySelect.value).toBe('High');
  });

  test('calls onEdit with updated task data when Save button is clicked', () => {
    // Get inputs by their roles
    const inputs = screen.getAllByRole('textbox');
    const titleInput = inputs.find(input => input.value === 'Test Task 1');
    const dateInput = screen.getByDisplayValue('2023-05-01');
    const descInput = screen.getByDisplayValue('Description 1');
    const prioritySelect = screen.getByRole('combobox');
    
    // Modify form fields
    fireEvent.change(titleInput, { 
      target: { value: 'Updated Task Title' } 
    });
    fireEvent.change(descInput, { 
      target: { value: 'Updated Description' } 
    });
    fireEvent.change(dateInput, { 
      target: { value: '2023-05-15' } 
    });
    fireEvent.change(prioritySelect, { 
      target: { value: 'Medium' } 
    });
    
    // Click the save button
    fireEvent.click(screen.getByText('Save'));
    
    // Check if onEdit was called with updated values
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith({
      newTaskTitle: 'Updated Task Title',
      newTaskDescription: 'Updated Description',
      newTaskDate: '2023-05-15',
      newTaskPriority: 'Medium'
    });
  });

  test('validates required fields before calling onEdit', () => {
    // Get inputs by their roles
    const inputs = screen.getAllByRole('textbox');
    const titleInput = inputs.find(input => input.value === 'Test Task 1');
    
    // Clear title field
    fireEvent.change(titleInput, { 
      target: { value: '' } 
    });
    
    // Try to save with invalid form
    fireEvent.click(screen.getByText('Save'));
    
    // Alert should be triggered
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields!');
    expect(mockOnEdit).not.toHaveBeenCalled();
  });

  test('calls onCancel when Cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('applies correct blue theme styling', () => {
    const card = screen.getByText('Edit Task').closest('div');
    expect(card).toHaveClass('bg-blue-400/40');
    expect(card).toHaveClass('border-blue-400');
    expect(card).toHaveClass('text-blue-700');
  });
}); 