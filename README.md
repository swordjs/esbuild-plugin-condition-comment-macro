# esbuild-plugin-condition-comment-macro

This is an esbuild plugin, which can be given a condition that will filter out unqualified macro comment blocks from the code. This is usually used for conditional builds

## Installation

```bash
npm install @swordjs/esbuild-plugin-condition-comment-macro -D
```

Or use yarn / pnpm


## Usage

```js
import * as esbuild from 'esbuild'
import { ConditionCommentMacroPlugin } from "@swordjs/esbuild-plugin-condition-comment-macro"

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
```

Just like `build.js` in the `test/fixture` folder, when using esbuild, just pass some necessary parameters to the plugin

In the above code, we simply implement a conditional compilation function, we set the condition to `aliyun`, and then write the following code in the code

```js
// @ifdef server || woker || aliyun
const test = 1
// @endif
// @ifdef aliyun
const a = 1
// @endif
// @ifndef aliyun || server
const b = 1
// @endif
```

Then esbuild will output this code content

```js
"use strict";
const test = 1;
const a = 1;
```



## Options

```ts
interface Options {
    // Macro prefix, we recommend using @
    prefix: string,
    // A custom action on the start macro, which returns the current matching fragment, along with the macro parameters and the regular being matched
    startMacro: Record<string, (params: {match: string, args: string[], reg: RegExp}) => string>,
    // End macro
    endMacro: string,
}
```



