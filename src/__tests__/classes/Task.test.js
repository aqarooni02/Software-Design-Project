import { Task } from '../../classes/Task';

// Mock uuid to control the generated IDs in tests
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-123')
}));

describe('Task Class', () => {
  test('creates a task with correct properties', () => {
    const task = new Task(
      'Test Task', 
      'Description', 
      '2023-05-01', 
      'High', 
      false
    );
    
    expect(task.taskTitle).toBe('Test Task');
    expect(task.taskDescription).toBe('Description');
    expect(task.taskDate).toBe('2023-05-01');
    expect(task.taskPriority).toBe('High');
    expect(task.taskStatus).toBe(false);
    expect(task.taskId).toBe('test-uuid-123');
  });
  
  test('uses provided taskId when given', () => {
    const testId = '123-test-id';
    const task = new Task(
      'Test', 
      'Desc', 
      '2023-05-01', 
      'Low', 
      true, 
      testId
    );
    
    expect(task.taskId).toBe(testId);
    expect(task.taskTitle).toBe('Test');
    expect(task.taskDescription).toBe('Desc');
    expect(task.taskDate).toBe('2023-05-01');
    expect(task.taskPriority).toBe('Low');
    expect(task.taskStatus).toBe(true);
  });
}); 