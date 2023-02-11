import * as esbuild from 'esbuild'
import { ConditionCommentMacroPlugin } from "esbuild-plugin-condition-comment-macro"

const condition = "aliyun"

await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/out.js',
  plugins: [ConditionCommentMacroPlugin({
    prefix: "@",
    startMacro: {
      ifdef: ({ match, args, reg }) => args.includes(condition) ? match : match.replace(reg, ''),
      ifndef: ({ match, args, reg }) => args.includes(condition) ? match.replace(reg, '') : match,
    },
    endMacro: "endif"
  })()]
})