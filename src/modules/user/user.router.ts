import { Router } from "src/core/decorators";
import { Request, Response } from "express"
import { Get } from "src/core/decorators/http.decorator";

@Router("/users")
export default class UserRouter {
    @Get("")
    users(req: Request, res: Response) {
        res.status(200).send('Users')
    }
}
