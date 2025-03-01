// script.js
// the main structure of the classes and their attributes, similar to the UML diagrams.

// Base User class
class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    viewTasks() {
        console.log(`${this.name} is viewing tasks.`);
    }
    
    createTask() {
        console.log(`${this.name} is creating a task.`);
    }
}

// Parent class extending User
class Parent extends User {
    constructor(name) {
        super(name, 'Parent');
    }

    assignTask(task, child) {
        console.log(`${this.name} assigned ${task.title} to ${child.name}.`);
    }

    approveTaskCompletion(task) {
        console.log(`${this.name} approved completion of ${task.title}.`);
    }

    completeTask(task) {
        task.status = "Completed";
        console.log(`${this.name} marked ${task.title} as completed.`);
    }

    giveStars(task, stars) {
        console.log(`${this.name} gave ${stars} stars for completing ${task.title}.`);
    }
}

// Child class extending User
class Child extends User {
    constructor(name) {
        super(name, 'Child');
    }

    markTaskInProgress(task) {
        task.status = "In Progress";
        console.log(`${this.name} marked ${task.title} as in progress.`);
    }

    completeTask(task) {
        task.status = "Completed";
        console.log(`${this.name} completed ${task.title}.`);
    }
}

// Task class
class Task {
    constructor(title, assignedTo, dueDate, priority) {
        this.title = title;
        this.status = "Pending";
        this.assignedTo = assignedTo;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

// TaskManager class
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(title, assignedTo, dueDate, priority) {
        const task = new Task(title, assignedTo, dueDate, priority);
        this.tasks.push(task);
        console.log(`Task '${title}' created.`);
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
        console.log(`Task '${task.title}' deleted.`);
    }

    updateTask(task, newStatus) {
        task.status = newStatus;
        console.log(`Task '${task.title}' updated to '${newStatus}'.`);
    }
}

// Calendar class
class Calendar {
    viewSharedCalendar() {
        console.log("Viewing shared calendar.");
    }
}

// Analytics class
class Analytics {
    viewAllAnalytics() {
        console.log("Viewing all analytics.");
    }
    
    viewAnalyticsForChild(child) {
        console.log(`Viewing analytics for ${child.name}.`);
    }
}
