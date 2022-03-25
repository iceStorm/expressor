import App, { AppFactory } from "app"
import AppModule from "app/app.module"
import UserRouter from "modules/user/user.controller"

AppFactory.create(AppModule)
