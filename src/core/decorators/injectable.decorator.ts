import { DIContainer } from "../injector"

export enum InjectableScope {
    SINGLETON,
    TRANSIENT,
    REQUEST,
}

export interface InjectableOptions {
    token: string | symbol
    scope?: InjectableScope
}

/**
 * Injectable decorator.
 * Mark the target object injectable.
 * @param options
 * @returns
 */
export default function Injectable(options?: InjectableOptions) {
    return function (target: any) {
        DIContainer.put(target.name, new target())
    }
}

export function Inject(token: string | symbol) {
    return function (target: any, token: any) {
        console.log(token)
    }
}
