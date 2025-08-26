import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/tests/setup.ts',
		css: {
			modules: {
				classNameStrategy: 'non-scoped',
			},
		},
	},
})
// import { defineConfig } from 'vite';

// export default defineConfig({
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: ['./src/test/setup.ts'], // Файл с полифиллами
//   },
// });
