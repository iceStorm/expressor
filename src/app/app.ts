import path from "path"

import express, { Application, Express } from "express"
import * as dotenv from "dotenv"
import logger from "morgan"

import BaseController from "src/common/base.controller"
import AppModule from "src/app/app.module"
import helmet from "helmet"
import DECORATOR_KEYS from "src/core/decorators/constants"
import { AppRoute, HTTPMethod } from "src/core/decorators/http.decorator"

export type AppConstructor = {
    port: number | undefined
    controllers?: BaseController[]
    rootModule: AppModule
}

type RouteMapItem = {
    router: string
    path: string
    controller: string
    function: string
    method: HTTPMethod
}

export default class App {
    private _port: number | string | undefined
    public get port(): number | string | undefined {
        return this._port
    }

    private _instance: express.Application
    public get instance() {
        return this._instance
    }

    private _controllers?: BaseController[]
    public get controllers() {
        return this._controllers
    }

    private _rootModule: any
    public get rootModule() {
        return this._rootModule
    }
    public set rootModule(value) {
        this._rootModule = value
    }

    constructor(params: AppConstructor) {
        this.loadEnv()

        this._instance = express()
        this._port = process.env.PORT || params.port
        this._controllers = params.controllers
        this._rootModule = params.rootModule

        this.initializeMiddlewares()
        this.initializeRoutes()
    }

    /**
     * Start server and listening on the defined port.
     */
    listen() {
        this._instance.listen(this._port, () => {
            console.log(`Server listening on: http://localhost:${this.port}`)
        })
    }

    /**
     * Load environment variables for the entire application for using later.
     */
    private loadEnv() {
        // console.log(path.resolve(__dirname, "../env/.env"))

        // LOADING ENVIRONMENT VARIABLES FROM .env FILES
        dotenv.config({
            debug: process.env.NODE_ENV === "development",
            path: __dirname + "../env/.env",
        })
    }

    /**
     * Load middlewares.
     */
    private initializeMiddlewares() {
        this._instance.use(logger("dev"))

        this._instance.use(
            helmet({
                xssFilter: true,
                hidePoweredBy: false,
            })
        )

        this._instance.use(express.json()) // allowing server to receive json request format.
        this._instance.use(express.urlencoded({ extended: true }))
    }

    /**
     * Load routes from controllers.
     */
    private initializeRoutes() {
        // getting all modules in the application
        const controllers = []
        const modules = [this.rootModule]

        // using traversal method to get all controllers
        while (modules.length > 0) {
            const firstModule = modules.shift()

            const currentModuleControllers = Reflect.getMetadata(DECORATOR_KEYS.CONTROLLERS, firstModule)
            if (currentModuleControllers && currentModuleControllers.length > 0) {
                controllers.push(...currentModuleControllers)
            }

            const childModules = Reflect.getMetadata(DECORATOR_KEYS.MODULES, firstModule)
            if (childModules && childModules.length > 0) {
                modules.push(...childModules)
            }
        }

        // for logging routes table
        const routesMapTable: Array<RouteMapItem> = []

        controllers.forEach((controller) => {
            // getting controller's metadata
            const routerRootPath = Reflect.getMetadata(DECORATOR_KEYS.ROOT_PATH, controller)

            // getting router's handler methods
            const routerHandlers = Reflect.getMetadata(DECORATOR_KEYS.ROUTES, controller)

            // each controller has its own router on the root path
            const router = express.Router()

            routerHandlers.forEach((handler: AppRoute) => {
                // binding router handler method for specific path
                router[handler.httpMethod](handler.path, handler.method).bind(new controller())

                routesMapTable.push({
                    router: routerRootPath,
                    controller: controller.name,
                    path: routerRootPath + "" + handler.path,
                    function: `${controller.name}.${handler.method.name}`,
                    method: handler.httpMethod,
                })
            })

            // apply router as middleware
            this._instance.use(routerRootPath, router)
        })

        console.info(controllers)
        console.table(routesMapTable)

        // prevent duplicating router root path
        this.checkDuplicatedRoutes(routesMapTable)
    }

    checkDuplicatedRoutes(routes: RouteMapItem[]) {
        const routePaths = routes.map((route) => route.path)
        const uniqueRoutePaths = new Set(...routePaths)

        if (routes.length != uniqueRoutePaths.size) {
            // const duplicatedRoutePaths = routePaths.filter((path) => {
            //     return uniqueRoutePaths.
            // })
            // throw new Error(`Duplicated routes: `)
        }
    }
}
