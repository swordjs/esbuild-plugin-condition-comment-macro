import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    // If entries is not provided, will be automatically inferred from package.json
    entries: [
        './src/index',
    ],
    rollup: {
        emitCJS: true
    },
    declaration: true,
})