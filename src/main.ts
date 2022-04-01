import App from "src/app/app"
import AppModule from "./app/app.module"

const port = (process.env.PORT || 7502) as number

const app = new App({
    port: port,
    rootModule: AppModule,
})

app.listen()
