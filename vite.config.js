import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // We list the specific sub-packages here 
    // This stops Vite from trying to guess where the "root" of Firebase is
    include: [
      'firebase/app',
      'firebase/auth'
    ],
  },
})