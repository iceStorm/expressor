import { Injectable, Service } from "core/decorators"
import { InjectableScope } from "core/decorators/injectable.decorator"
import UserStore from "modules/user/user.store"

@Injectable({
    scope: InjectableScope.SINGLETON,
})
export default class AppService {
    constructor(private readonly userStore: UserStore) {}

    get() {
        return "Hello World"
    }

    getAllUser() {
        return this.userStore.getAll()
    }
}
