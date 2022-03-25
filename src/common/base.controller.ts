import { Router } from "express";

export default interface BaseController {
    /**
     * Controller's root path.
     */
    path: string
    /**
     * Controller's router.
     */
    router: Router

    attachRoutesToHanlders(): void
}
