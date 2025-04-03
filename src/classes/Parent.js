import { User } from "./User";

export class Parent extends User {
    constructor(name) {
        super(name, 'Parent');
        this.children = []
    }

    addChild(child) {
        this.children = [...this.children, child]
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
