import { Module } from "src/core/decorators"
import UserRouter from "src/modules/user/user.router"
import AppRouter from "./app.router"
import AppService from "./app.service"

@Module({
    providers: [AppService],
    routers: [AppRouter, UserRouter],
})
export default class AppModule {}
