import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { CreateTaskCard } from '../../components/CreateTaskCard';
import { Task } from '../../classes/Task';

// Mock the Task class constructor
jest.mock('../../classes/Task', () => ({
  Task: jest.fn().mockImplementation((title, desc, date, priority, status) => ({
    taskId: 'test-task-id',
    taskTitle: title,
    taskDescription: desc,
    taskDate: date,
    taskPriority: priority,
    taskStatus: status
  }))
}));

describe('CreateTaskCard Component', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset alert mock
    window.alert.mockClear();
    
    render(
      <CreateTaskCard 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        theme="blue" 
      />
    );
  });

  // Helper function to get form inputs safely
  const getFormInputs = () => {
    const titleContainer = screen.getByText('Task Title').closest('div');
    const dateContainer = screen.getByText('Date').closest('div');
    const descriptionContainer = screen.getByText('Description').closest('div');
    
    const titleInput = within(titleContainer).getByRole('textbox');
    const dateInput = within(dateContainer).getByDisplayValue('');
    const descriptionInput = within(descriptionContainer).getByRole('textbox');
    const prioritySelect = screen.getByRole('combobox');
    
    return { titleInput, dateInput, descriptionInput, prioritySelect };
  };

  test('renders all form elements correctly', () => {
    // Check that the component renders with the correct title
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    
    // Check for labels
    expect(screen.getByText('Task Title')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    
    // Check for inputs using the helper
    const { titleInput, dateInput, descriptionInput, prioritySelect } = getFormInputs();
    expect(titleInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('validates required fields when saving', () => {
    // Try to save with empty fields
    fireEvent.click(screen.getByText('Save'));
    
    // Check if alert was shown for missing fields
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields!');
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('creates a new task when form is valid and save is clicked', () => {
    // Get form inputs
    const { titleInput, dateInput, descriptionInput } = getFormInputs();
    
    // Fill in the form
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(dateInput, { target: { value: '2023-05-01' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    // Click the save button
    fireEvent.click(screen.getByText('Save'));
    
    // Check if onSave was called with the correct task
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(Task).toHaveBeenCalledWith(
      'Test Task',
      'Test Description',
      '2023-05-01',
      'Medium',
      false // Default to not completed
    );
  });

  test('calls onCancel when Cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('clears form inputs after saving successfully', () => {
    // Get form inputs
    const { titleInput, dateInput, descriptionInput } = getFormInputs();
    
    // Fill in the form
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(dateInput, { target: { value: '2023-05-01' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    // Save the task
    fireEvent.click(screen.getByText('Save'));
    
    // Check if inputs were cleared
    expect(titleInput.value).toBe('');
    expect(dateInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
}); 