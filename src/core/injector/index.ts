import "reflect-metadata"

export type Provider = {
    className: any
    instance: any
}

export const Injector = new (class {
    private providers: Provider[] = []

    /**
     * Getting the declared instance of the target class
     * @param target The class want to be resolved
     */
    resolve<T>(target: any): T {
        // tokens are required dependencies
        const tokens = Reflect.getMetadata("design:paramtypes", target) || []

        // tokens are required dependencies
        const injections = tokens.map((token: any) => Injector.resolve<any>(token))

        // initialize instance
        return new target(...injections)
    }
})()
