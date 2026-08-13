import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Shri_Ganesh_Paint/',   // ← Must match your exact repository name (case-sensitive)
})