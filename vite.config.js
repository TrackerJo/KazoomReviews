import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: '/friends-and-family-reviews/',
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root,  'index.html'),
        addRestaurant: resolve(root,  'addRestaurant' ,'index.html'),
        findRestaurant: resolve(root,  'findRestaurants' ,'index.html'),
        friendLink: resolve(root,  'friendLink' ,'index.html'),
        login: resolve(root ,'login' ,'index.html'),
        manageFriends: resolve(root,  'manageFriends' ,'index.html'),
        manageProfile: resolve(root,  'manageProfile' ,'index.html'),
        viewFavoritedRestaurants: resolve(root,  'viewFavoritedRestaurants' ,'index.html'),
        viewRestaurant: resolve(root,  'viewRestaurant' ,'index.html'),
        viewUserProfile: resolve(root,  'viewUserProfile' ,'index.html'),
      }
    }
  }
})
