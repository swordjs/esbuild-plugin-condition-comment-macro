import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: [
        './src/index',
    ],
    rollup: {
        emitCJS: true,
        dts: {
            respectExternal: false
        }
    },
    failOnWarn: false,
    declaration: true,
})