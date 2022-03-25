export enum InjectableScope {
    SINGLETON,
    TRANSIENT,
    REQUEST,
}

export interface InjectableOptions {
    scope?: InjectableScope
}

/**
 * Injectable decorator.
 * Mark the target class injectable.
 * @param options 
 * @returns 
 */
export default function Injectable(options?: InjectableOptions): ClassDecorator {
    return function (target) {}
}
