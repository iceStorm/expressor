import DECORATOR_KEYS from "./constants"
import { AppRoute } from "./http.decorator"

/**
 * Defining a router for receiving request on a specific path.
 * @param rootPath Router root path
 * @returns
 */
export default function Controller(rootPath: string) {
    return function (target: any) {
        const routes = Reflect.getMetadata(DECORATOR_KEYS.ROUTES, target)
        Reflect.defineMetadata(DECORATOR_KEYS.ROOT_PATH, rootPath, target)
    }
}
