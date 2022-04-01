import BaseController from "src/common/base.controller"
import { Type } from "src/core/types/Type"
import DECORATOR_KEYS from "./constants"
import { InjectableOptions } from "./injectable.decorator"

export interface ModuleParams {
    /**
     * Optional list of providers that will be instantiated by the Injector
     * and that may be shared at least across this module.
     */
    providers?: any[]
    /**
     * Optional list of controllers defined in this module which have to be
     * instantiated.
     */
    controllers?: Type<any>[]

    imports?: Type<any>[]
}

export default function Module(metadata?: ModuleParams): ClassDecorator {
    return function (target) {
        // pushing routers classes to the module's metadata
        Reflect.defineMetadata(DECORATOR_KEYS.CONTROLLERS, metadata?.controllers ?? [], target)
        Reflect.defineMetadata(DECORATOR_KEYS.MODULES, metadata?.imports ?? [], target)
    }
}
