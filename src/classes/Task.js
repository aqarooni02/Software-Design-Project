import { v4 as uuidv4 } from 'uuid';
export class Task {
  constructor(taskTitle, taskDescription, taskDate, taskPriority, taskStatus) {
    this.taskId = uuidv4();
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskDate = taskDate;
    this.taskPriority = taskPriority;
    this.taskStatus = taskStatus;
  }
}