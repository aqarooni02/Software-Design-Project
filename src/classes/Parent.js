import { User } from "./User";

/**
 * Parent class extending User, representing a parent user in the Homey application.
 * @class
 * @extends User
 */
export class Parent extends User {
    /**
     * Creates a new Parent instance.
     * @param {string} name - The name of the parent
     */
    constructor(name) {
        super(name, 'Parent');
        this.children = []
    }

    /**
     * Adds a child to the parent's list of children.
     * @param {Child} child - The child to add
     */
    addChild(child) {
        this.children = [...this.children, child]
    }

    /**
     * Assigns a task to a child.
     * @param {Task} task - The task to assign
     * @param {Child} child - The child to assign the task to
     */
    assignTask(task, child) {
        console.log(`${this.name} assigned ${task.title} to ${child.name}.`);
    }

    /**
     * Approves the completion of a task.
     * @param {Task} task - The task to approve
     */
    approveTaskCompletion(task) {
        console.log(`${this.name} approved completion of ${task.title}.`);
    }

    /**
     * Marks a task as completed.
     * @param {Task} task - The task to mark as completed
     */
    completeTask(task) {
        task.status = "Completed";
        console.log(`${this.name} marked ${task.title} as completed.`);
    }

    /**
     * Gives stars to a child for completing a task.
     * @param {Task} task - The completed task
     * @param {number} stars - The number of stars to give (1-5)
     */
    giveStars(task, stars) {
        console.log(`${this.name} gave ${stars} stars for completing ${task.title}.`);
    }
}
