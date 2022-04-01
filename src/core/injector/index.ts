import "reflect-metadata"

export type Provider = {
    token: any
    instance: any
}

export const DIContainer = new (class {
    private providers: Provider[] = []

    /**
     * Putting a provider with unique token to the centralized DI Container.
     */
    put(token: string | symbol, value: any) {
        this.providers.push({
            token,
            instance: value,
        })
    }

    /**
     * Getting the declared instance of the target class
     * @param target The class want to be resolved
     */
    resolve<T>(target: any): T {
        // tokens are required dependencies
        const tokens = Reflect.getMetadata("design:paramtypes", target) || []

        // tokens are required dependencies
        const injections = tokens.map((token: any) => DIContainer.resolve<any>(token))

        // initialize instance
        return new target(...injections)
    }
})()
