class Task {
  constructor(taskId,taskTitle, taskDescription, taskDate, taskPriority, taskStatus) {
    this.taskId = uuidv4();
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskDate = taskDate;
    this.taskPriority = taskPriority;
    this.taskStatus = taskStatus;
  }
}
