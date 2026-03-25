import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdownSections from "./plugins/markdown-sections";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), markdownSections()],
})
