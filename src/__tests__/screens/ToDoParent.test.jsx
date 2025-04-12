import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { ToDoParent } from '../../screens/ToDoParent';
import { Task } from '../../classes/Task';

// Mock the Task class
jest.mock('../../classes/Task', () => ({
  Task: jest.fn().mockImplementation((title, desc, date, priority, status, id) => ({
    taskId: id || 'mock-task-id',
    taskTitle: title,
    taskDescription: desc,
    taskDate: date,
    taskPriority: priority,
    taskStatus: status || false
  }))
}));

// Mock NavBar component to simplify testing
jest.mock('../../components/NavBar', () => ({
  NavBar: () => <div data-testid="navbar">NavBar Mock</div>
}));

// Mock Character component to simplify testing
jest.mock('../../components/Character', () => ({
  Character: () => <div data-testid="character">Character Mock</div>
}));

describe('ToDoParent Component', () => {
  // Sample test task data
  const testTasks = [
    {
      taskId: 'task-1',
      taskTitle: 'Test Task 1',
      taskDescription: 'Description 1',
      taskDate: '2023-05-01',
      taskPriority: 'High',
      taskStatus: false
    },
    {
      taskId: 'task-2',
      taskTitle: 'Test Task 2',
      taskDescription: 'Description 2',
      taskDate: '2023-05-02',
      taskPriority: 'Medium',
      taskStatus: true
    }
  ];
  
  // Helper function to get form inputs safely
  const getFormInputs = () => {
    const titleContainer = screen.getByText('Task Title').closest('div');
    const dateContainer = screen.getByText('Date').closest('div');
    const descriptionContainer = screen.getByText('Description').closest('div');
    
    const titleInput = within(titleContainer).getByRole('textbox');
    const dateInput = within(dateContainer).getByDisplayValue('');
    const descriptionInput = within(descriptionContainer).getByRole('textbox');
    
    return { titleInput, dateInput, descriptionInput };
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  test('loads tasks from localStorage on mount', () => {
    // Setup localStorage to return sample tasks
    window.localStorage.getItem.mockReturnValue(JSON.stringify(testTasks));
    
    render(<ToDoParent />);
    
    // Check if localStorage.getItem was called with the correct key
    expect(window.localStorage.getItem).toHaveBeenCalledWith('parentTasks');
    
    // Verify tasks are displayed in the UI
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  test('creates and stores a new task', async () => {
    // Setup localStorage
    window.localStorage.getItem.mockReturnValue(JSON.stringify([]));
    
    render(<ToDoParent />);
    
    // Click "Add Task" button to show create form
    fireEvent.click(screen.getByText('Add Task'));
    
    // Get form inputs
    const { titleInput, dateInput, descriptionInput } = getFormInputs();
    
    // Fill in the task form
    fireEvent.change(titleInput, { 
      target: { value: 'New Test Task' } 
    });
    fireEvent.change(dateInput, { 
      target: { value: '2023-05-10' } 
    });
    fireEvent.change(descriptionInput, { 
      target: { value: 'New Description' } 
    });
    
    // Save the task
    fireEvent.click(screen.getByText('Save'));
    
    // Check if localStorage.setItem was called with updated tasks
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'parentTasks',
      expect.any(String)
    );
    
    // Verify the task was added to the UI
    await waitFor(() => {
      expect(screen.getByText('New Test Task')).toBeInTheDocument();
    });
  });

  test('deletes a task', () => {
    // Setup localStorage to return sample tasks
    window.localStorage.getItem.mockReturnValue(JSON.stringify(testTasks));
    
    render(<ToDoParent />);
    
    // Find and click delete button for first task
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check if localStorage.setItem was called with updated tasks
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'parentTasks',
      expect.stringContaining('Test Task 2')
    );
    
    // Verify task is no longer in the document
    expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  test('toggles task completion status', () => {
    // Setup localStorage to return sample tasks
    window.localStorage.getItem.mockReturnValue(JSON.stringify(testTasks));
    
    render(<ToDoParent />);
    
    // Find and click checkbox for the first task
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Check if localStorage.setItem was called with updated tasks
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'parentTasks',
      expect.any(String)
    );
  });
}); 