import { Module } from "core/decorators"
import AppRouter from "./app.router"
import AppService from "./app.service"

@Module({
    providers: [AppService],
    routers: [AppRouter]
})
export default class AppModule {
    constructor() {
        "".replaceAll
    }
}
