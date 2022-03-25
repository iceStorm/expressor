export class User {
    id?: string
    username: string
    firstName?: string
    lastName?: string

    constructor(
        username: string,
        id?: string,
        firstName?: string,
        lastName?: string,
    ) {
        this.id = id
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}
