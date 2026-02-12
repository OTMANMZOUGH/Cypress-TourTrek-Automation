import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://tour-trek-git-main-rida-bensalem-s-projects.vercel.app',
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}"
  },
})