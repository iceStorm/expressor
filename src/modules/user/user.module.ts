import Module from "src/core/decorators/module.decorator"
import UserRouter from "./user.router"

@Module({
    routers: [UserRouter],
})
export default class UserModule {}
