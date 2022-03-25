import BaseController from "common/base.controller"
import { Type } from "core/types/Type"
import { InjectableOptions } from "./injectable.decorator"

export interface ModuleParams extends InjectableOptions {
    /**
     * Optional list of providers that will be instantiated by the Injector
     * and that may be shared at least across this module.
     */
    providers?: any[]
    /**
     * Optional list of controllers defined in this module which have to be
     * instantiated.
     */
    routers?: Type<any>[]
}

export default function Module(metadata?: ModuleParams): ClassDecorator {
    return function (target) {
        console.log(typeof target)
    }
}
