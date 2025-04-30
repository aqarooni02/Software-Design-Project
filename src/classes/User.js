/**
 * Base User class representing a user in the Homey application.
 * @class
 */
export class User {
    /**
     * Creates a new User instance.
     * @param {string} name - The name of the user
     * @param {string} role - The role of the user (e.g., 'Parent', 'Child')
     */
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
}