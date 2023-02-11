import { readFileSync } from "node:fs";
import type { Plugin } from 'esbuild';


export const ConditionCommentMacroPlugin = (options: {
    prefix: string,
    startMacro: Record<string, (params: {match: string, args: string[], reg: RegExp}) => string>,
    endMacro: string,
}): () => Plugin => {
    return () => {
       return {
        name: 'condition-comment-macro',
        setup(build) {
            build.onLoad({ filter: /\.(ts|js)?$/ }, args => {
                if (args.path.includes('node_modules')) {
                    console.log(`${args.path}; library; skipping`);
                    return;
                }
                const source = readFileSync(args.path, 'utf8');
                // The syntax of conditional compilation is commented
                const supportMarco = Object.keys(options.startMacro);
                // Dynamically construct a regular expression based on a prefix (e.g. @), and a start macro (e.g. if), and an end macro (e.g. endif) to match
                const startReg = `//\\s*${options.prefix}\\s*(${supportMarco.join('|')})\\s*(\\w+)\\s*([\\S\\s]*?)`;
                const endReg = `//\\s*${options.prefix}\\s*(${options.endMacro})`;
                const reg = new RegExp(`${startReg}${endReg}`, 'g');
                const result = source.replace(reg, (match, prefix, condition: string, args) => {
                    // If args starts with ||, it means it is a macro expression, which means either
                    if(args as string && args.startsWith('||')) {
                        // Take the first line of args, split it with ||, and remove the spaces
                        const macroArgs = [condition, ...(args.split('\n')[0].split('||').map((item: string) => item.trim()).filter(Boolean) as string[])];                     
                        return options.startMacro[prefix]({ match, args: macroArgs, reg });
                    }
                    return options.startMacro[prefix]({ match, args: [condition], reg });
                });
                return { contents: result, loader: 'ts' };
            })
        },
       }
    }
}