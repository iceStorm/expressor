import { Request, Response } from "express"
import { Router } from "src/core/decorators"
import { Get } from "src/core/decorators/http.decorator"

@Router("/")
export default class AppRouter {
    @Get("")
    index(req: Request, res: Response) {
        res.status(200).send("Ok")
    }

    @Get("hi")
    hi(req: Request, res: Response) {
        res.status(200).send("Hi")
    }
}
