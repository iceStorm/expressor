import { NextFunction, Request, Response } from "express"
import DECORATOR_KEYS from "./constants"

export type HTTPMethod = "get" | "post" | "put" | "patch" | "delete"

export type AppRoute = {
    path: string
    httpMethod: HTTPMethod
    method: any
    // string | symbol | Function(req: Request, res: Response, next: NextFunction): any
}

function HTTPMethodDecoratorFactory(method: HTTPMethod) {
    return function (path: string): MethodDecorator {
        return function (target, propertyKey, descriptor) {
            // getting the method's class (class type, not a string)
            const className = target.constructor
            console.log(propertyKey, descriptor)

            // getting the className's "ROUTES" metadata that holds routes
            const routers: Array<AppRoute> = Reflect.hasMetadata(DECORATOR_KEYS.ROUTES, className)
                ? Reflect.getMetadata(DECORATOR_KEYS.ROUTES, className)
                : []

            // pushing the new method decorator's to the className's ROUTES metadata
            routers.push({
                path: path,
                httpMethod: method,
                method: descriptor.value, // propertyKey is the function name being decorated
            })

            // re-assign the ROUTES metadata to the className
            Reflect.defineMetadata(DECORATOR_KEYS.ROUTES, routers, className)
        }
    }
}

export const Get = HTTPMethodDecoratorFactory("get")

export const Post = HTTPMethodDecoratorFactory("post")

export const Put = HTTPMethodDecoratorFactory("put")

export const Patch = HTTPMethodDecoratorFactory("patch")
