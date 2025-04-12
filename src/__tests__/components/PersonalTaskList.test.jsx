import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PersonalTaskList } from '../../components/PersonalTaskList';

describe('PersonalTaskList Component', () => {
  // Sample test tasks
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

  // Mock callback functions
  const mockAddTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleStatus = jest.fn();
  const mockEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task list with correct number of tasks', () => {
    render(
      <PersonalTaskList
        tasks={testTasks}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="blue"
      />
    );
    
    // Check for task titles
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    
    // Check for add task button
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('displays empty state when no tasks are provided', () => {
    render(
      <PersonalTaskList
        tasks={[]}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="blue"
      />
    );
    
    // Check for empty state message
    expect(screen.getByText(/No tasks/i)).toBeInTheDocument();
  });

  test('calls addTask when Add Task button is clicked', () => {
    render(
      <PersonalTaskList
        tasks={testTasks}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="blue"
      />
    );
    
    // Click add task button
    fireEvent.click(screen.getByText('Add Task'));
    
    // Check if addTask callback was called
    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });

  test('calls deleteTask when Delete button is clicked', () => {
    render(
      <PersonalTaskList
        tasks={testTasks}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="blue"
      />
    );
    
    // Find and click the delete button for the first task
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check if deleteTask callback was called with correct taskId
    expect(mockDeleteTask).toHaveBeenCalledWith('task-1');
  });

  test('calls onToggleStatus when a task checkbox is clicked', () => {
    render(
      <PersonalTaskList
        tasks={testTasks}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="blue"
      />
    );
    
    // Find and click the checkbox for the first task
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Check if onToggleStatus callback was called with correct taskId
    expect(mockToggleStatus).toHaveBeenCalledWith('task-1');
  });

  test('calls onEdit when Edit button is clicked', () => {
    render(
      <PersonalTaskList
        tasks={testTasks}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="blue"
      />
    );
    
    // Find and click the edit button for the first task
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    // Check if onEdit callback was called with correct taskId
    expect(mockEdit).toHaveBeenCalledWith('task-1');
  });

  test('applies correct theme styling', () => {
    render(
      <PersonalTaskList
        tasks={testTasks}
        addTask={mockAddTask}
        deleteTask={mockDeleteTask}
        onToggleStatus={mockToggleStatus}
        onEdit={mockEdit}
        theme="pink"
      />
    );
    
    // Check for pink theme classes
    const addButton = screen.getByText('Add Task');
    expect(addButton).toHaveClass('bg-pink-500');
    
    // Check the header color
    const header = screen.getByText('Personal');
    expect(header).toHaveClass('text-2xl');
    
    // Check for edit buttons with theme color
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons[0]).toHaveClass('bg-pink-500');
  });
}); 