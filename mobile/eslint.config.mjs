import prettier from 'eslint-plugin-prettier'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...compat.extends('expo', 'prettier'),
  {
    plugins: {
      prettier
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: false,
          singleQuote: true,
          jsxSingleQuote: true,
          printWidth: 80,
          trailingComma: 'none',
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'avoid'
        }
      ]
    }
  }
]