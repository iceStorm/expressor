import { User } from "src/modules/user/user.model"

export default interface UserStore {
    /**
     * Getting all users from DB.
     */
    getAll(): User[]

    /**
     * Getting a User object from an id.
     * @param id the id of user want to get full object
     */
    getById(id: string): User

    /**
     * "Soft" removing a user from id.
     * @param id the id of user want to soft remove
     */
    softRemoveById(id: string): User

    /**
     * "Permanently" removing a user from id.
     * @param id the id of user want to be completely removed
     */
    permanentRemoveById(id: string): User

    /**
     * Updating a User object from an id.
     * @param id the id of user want to be updated
     * @param updatedUser the updated user info 
     */
    updateById(id: string, updatedUser: User): User
}
