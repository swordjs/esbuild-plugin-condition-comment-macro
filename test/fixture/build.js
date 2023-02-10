import * as esbuild from 'esbuild'
import {  } from "esbuild-plugin-condition-comment-macro"

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'out.js',
  plugins: [],
})