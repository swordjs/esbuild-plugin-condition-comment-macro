import { readFileSync } from "node:fs";
import type { Plugin } from 'esbuild';


// export const ConditionCommentMacroPlugin: Plugin = {
//     name: 'condition-comment-macro',
//     setup(build) {
//         build.onLoad({ filter: /\.(ts|js)?$/ }, args => {
//             const a = 1
//             if (args.path.includes('node_modules')) {
//                 console.log(`${args.path}; library; skipping`);
//                 return;
//             }
//             const source = readFileSync(args.path, 'utf8');
//         })
//     },
// }