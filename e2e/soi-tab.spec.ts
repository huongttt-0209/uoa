import { test, expect } from '@playwright/test';

test.describe('SOI Tab — BS Detector Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('tab', { name: /SOI/i }).click();
    });

    test('SOI tab shows empty textarea', async ({ page }) => {
        const textarea = page.getByRole('textbox');
        await expect(textarea).toBeVisible();
        await expect(textarea).toHaveValue('');
        await expect(page.getByText('0/1000')).toBeVisible();
    });

    test('typing less than 10 chars shows validation hint', async ({ page }) => {
        const textarea = page.getByRole('textbox');
        await textarea.fill('abc');

        await expect(page.getByText(/ít nhất.*ký tự/i)).toBeVisible();
        await expect(page.locator('.bs-gauge')).not.toBeVisible();
    });

    test('typing 10+ chars shows analysis results automatically', async ({ page }) => {
        const textarea = page.getByRole('textbox');
        await textarea.fill('Em bi om nen khong the di hoc duoc hom nay');

        await expect(page.locator('.bs-gauge')).toBeVisible({ timeout: 3000 });
        await expect(page.locator('.verdict-badge')).toBeVisible({ timeout: 3000 });
    });

    test('BSGauge displays score as percentage', async ({ page }) => {
        await page.getByRole('textbox').fill('Em bi om nen khong the di hoc duoc hom nay');

        const gauge = page.getByRole('meter');
        await expect(gauge).toBeVisible({ timeout: 3000 });
        const score = await gauge.getAttribute('aria-valuenow');
        expect(Number(score)).toBeGreaterThanOrEqual(0);
        expect(Number(score)).toBeLessThanOrEqual(100);

        await expect(page.locator('.bs-gauge__score')).toContainText('%');
    });

    test('VerdictBadge shows verdict label with emoji', async ({ page }) => {
        await page.getByRole('textbox').fill('Em bi om nen khong the di hoc duoc hom nay');

        const verdict = page.locator('.verdict-badge');
        await expect(verdict).toBeVisible({ timeout: 3000 });
        const text = await verdict.textContent();
        expect(text!.length).toBeGreaterThan(2);
    });

    test('BSBreakdown shows 4 factors sorted by impact', async ({ page }) => {
        await page.getByRole('textbox').fill('Em bi om nen khong the di hoc duoc hom nay');

        const breakdown = page.getByRole('list', { name: /phân tích chi tiết/i });
        await expect(breakdown).toBeVisible();

        const items = breakdown.getByRole('listitem');
        await expect(items).toHaveCount(4);

        for (let i = 0; i < 4; i++) {
            const item = items.nth(i);
            await expect(item.locator('.bs-breakdown__label')).toBeVisible();
            await expect(item.locator('.bs-breakdown__value')).toContainText('%');
        }
    });

    test('ShareButton copies result to clipboard', async ({ page }) => {
        await page.getByRole('textbox').fill('Em bi om nen khong the di hoc duoc hom nay');

        // Wait for analysis results to load
        await expect(page.locator('.bs-gauge')).toBeVisible({ timeout: 3000 });

        const shareBtn = page.getByRole('button', { name: /chia sẻ/i });
        await shareBtn.scrollIntoViewIfNeeded();
        await expect(shareBtn).toBeVisible();
        await shareBtn.click();

        // Wait for clipboard async
        await expect(shareBtn).toContainText(/đã copy|copied/i, { timeout: 5000 });
    });

    test('high-BS text produces elevated score', async ({ page }) => {
        // Text loaded with exaggeration + hedging + deflection keywords
        await page.getByRole('textbox').fill(
            'Chắc chắn tuyệt đối sẽ hoàn toàn thay đổi cuộc sống, có lẽ hầu như ai bảo tại vì người ta tự nhiên chắc là thường thường không biết'
        );

        const gauge = page.getByRole('meter');
        await expect(gauge).toBeVisible({ timeout: 3000 });
        const score = Number(await gauge.getAttribute('aria-valuenow'));
        expect(score).toBeGreaterThanOrEqual(40);
    });
});

