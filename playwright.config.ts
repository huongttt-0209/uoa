import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:5174',
        headless: true,
        screenshot: 'only-on-failure',
        permissions: ['clipboard-read', 'clipboard-write'],
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5174',
        reuseExistingServer: true,
        timeout: 10_000,
    },
});
