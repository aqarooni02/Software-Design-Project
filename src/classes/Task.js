import { v4 as uuidv4 } from 'uuid';

/**
 * Task class representing a task in the Homey application.
 * @class
 */
export class Task {
  /**
   * Creates a new Task instance.
   * @param {string} taskTitle - The title of the task
   * @param {string} taskDescription - The description of the task
   * @param {string} taskDate - The due date of the task
   * @param {string} taskPriority - The priority of the task (e.g., 'High', 'Medium', 'Low')
   * @param {boolean} taskStatus - The completion status of the task
   * @param {string} [taskId] - Optional unique identifier for the task. If not provided, a new UUID will be generated.
   */
  constructor(taskTitle, taskDescription, taskDate, taskPriority, taskStatus, taskId) {
    if (taskId) {
      this.taskId = taskId
    }
    else {
      this.taskId = uuidv4();
    }
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskDate = taskDate;
    this.taskPriority = taskPriority;
    this.taskStatus = taskStatus;
  }
}