import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  /* Ignore replacement for .eslintignore */
  {
    ignores: [
      'node_modules',
      'dist',
      'dist-bundle',
      'coverage',
      '*.log',
      '*.js',
      '*.d.ts',
      '.env*'
    ],
  },

  /* Base JS rules */
  eslint.configs.recommended,

  /* TypeScript recommended + type-checked */
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },

    plugins: {
      import: importPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      /* -------- Type safety -------- */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-floating-promises': 'error',

      /* -------- Clean Architecture -------- */
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',

      /* -------- Practical backend rules -------- */
      'no-console': 'warn',
    },
  },

  /* Bootstrap & config files */
  {
    files: ['src/server.ts', '**/config/**'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  /* Tests */
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
