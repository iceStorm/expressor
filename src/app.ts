import path from "path"

import express, { Application, Express } from "express"
import * as dotenv from "dotenv"
import logger from "morgan"

import BaseController from "common/base.controller"

export type AppConstructor = {
    port: number | undefined
    controllers: BaseController[]
}

export type AppFactoryOptions = {
    
}

export const AppFactory = {
    create(rootModule: any, options?: AppFactoryOptions) {

    }
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

    private _controllers: BaseController[]
    public get controllers(): BaseController[] {
        return this._controllers
    }

    constructor(params: AppConstructor) {
        this.loadEnv()

        this._instance = express()
        this._port = process.env.PORT || params.port
        this._controllers = params.controllers

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
        console.log(path.resolve(__dirname, "../env/.env"))

        // LOADING ENVIRONMENT VARIABLES FROM .env FILES
        dotenv.config({
            debug: process.env.NODE_ENV === "development",
            path: __dirname + "../env/.env",
        })
    }

    /**
     * Load routes from controllers.
     */
    private initializeRoutes() {
        this.controllers.forEach((controller) => {
            // only need to use the root path, other children path will be loaded via Controller's constructor
            this._instance.use(controller.path, controller.router)
        })
    }

    /**
     * Load middlewares.
     */
    private initializeMiddlewares() {
        this._instance.use(logger("dev"))
        this._instance.use(express.json()) // allowing server to receive json request format.
        this._instance.use(express.urlencoded({ extended: true }))
    }
}
