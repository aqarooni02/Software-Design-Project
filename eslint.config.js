import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import parserBabel from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,cjs,mjs}"],
    languageOptions: {
      parser: parserBabel,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, //Enables JSX parsing
        },
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "off",
    },
    ignores: ["node_modules", "dist"],
  },
]);
