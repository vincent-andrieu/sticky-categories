import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import banner from "rollup-plugin-banner2";

export default {
    input: "src/main.ts", // The entry point of your application
    output: {
        file: "build/sticky-categories.plugin.js", // The output bundled file
        format: "commonjs" // The output format ('module', 'commonjs', 'iife', 'umd', 'amd', 'system')
    },
    external: [],
    plugins: [
        resolve(), // Allows Rollup to resolve modules
        commonjs(), // Converts CommonJS modules to ES6
        typescript({
            tsconfig: "tsconfig.json"
        }),
        banner(() => [
            "/**",
            " * @name StickyCategories",
            " * @author gassastsina",
            " * @description Make categories sticky in the channel list. Add a clickable area above categories to scroll to it.",
            " * @version 1.0.0",
            " * @authorId 292388871381975040",
            " * @source https://github.com/vincent-andrieu/sticky-categories",
            " * @updateUrl https://raw.githubusercontent.com/vincent-andrieu/sticky-categories/refs/heads/main/build/sticky-categories.plugin.js",
            " */"
        ].join("\n") + '\n')
    ]
};
