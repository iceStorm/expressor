import { Module } from "src/core/decorators"
import UserController from "src/modules/user/user.controller"
import UserModule from "src/modules/user/user.module"
import AppController from "./app.controller"
import AppService from "./app.service"

@Module({
    imports: [UserModule],
    providers: [AppService],
    controllers: [AppController],
})
export default class AppModule {}
