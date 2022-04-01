import { Controller } from "src/core/decorators";
import { Request, Response } from "express"
import { Get, Post } from "src/core/decorators/http.decorator";

@Controller("/users")
export default class UserController {
    @Get("")
    users(req: Request, res: Response) {
        res.status(200).send('Users')
    }

    @Post("/update")
    update(req: Request, res: Response) {
        res.status(200).send('Update')
    }
}
