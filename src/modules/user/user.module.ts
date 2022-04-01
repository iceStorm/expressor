import Module from "src/core/decorators/module.decorator"
import UserController from "./user.controller"

@Module({
    controllers: [UserController],
})
export default class UserModule {}
