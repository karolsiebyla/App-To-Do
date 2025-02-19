// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // widać testy w oknie przeglądarki
  },
  testDir: './tests', 
});
