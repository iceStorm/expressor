import { User } from "../user.model"
import UserStore from "../user.store"

export class MockUserStore implements UserStore {
    getAll(): User[] {
        throw new Error("Method not implemented.")
    }

    getById(id: string): User {
        throw new Error("Method not implemented.")
    }

    softRemoveById(id: string): User {
        throw new Error("Method not implemented.")
    }

    permanentRemoveById(id: string): User {
        throw new Error("Method not implemented.")
    }

    updateById(id: string, updatedUser: User): User {
        throw new Error("Method not implemented.")
    }
}
