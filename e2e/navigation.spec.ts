import { test, expect } from '@playwright/test';

test.describe('Tab Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('clicking tabs switches content', async ({ page }) => {
        // TẠO tab should be active by default
        await expect(page.getByRole('tab', { name: /TẠO/i })).toHaveAttribute('aria-selected', 'true');
        await expect(page.locator('.tao-tab')).toBeVisible();

        // Click SOI tab
        await page.getByRole('tab', { name: /SOI/i }).click();
        await expect(page.getByRole('tab', { name: /SOI/i })).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByRole('tab', { name: /TẠO/i })).toHaveAttribute('aria-selected', 'false');
        await expect(page.locator('.soi-tab')).toBeVisible();

        // Click TẠO tab again
        await page.getByRole('tab', { name: /TẠO/i }).click();
        await expect(page.locator('.tao-tab')).toBeVisible();
    });

    test('tab content resets when switching', async ({ page }) => {
        // Generate excuse in TẠO
        await page.getByRole('button', { name: /tạo excuse/i }).click();
        await expect(page.locator('.excuse-result__text')).toBeVisible();

        // Switch to SOI
        await page.getByRole('tab', { name: /SOI/i }).click();
        await expect(page.getByRole('textbox')).toBeVisible();

        // Switch back to TẠO — component re-mounts
        await page.getByRole('tab', { name: /TẠO/i }).click();
        await expect(page.locator('.tao-tab')).toBeVisible();
    });

    test('keyboard navigation works between tabs', async ({ page }) => {
        const taoTab = page.getByRole('tab', { name: /TẠO/i });
        await taoTab.focus();

        // Press ArrowRight to move to SOI tab
        await page.keyboard.press('ArrowRight');
        const soiTab = page.getByRole('tab', { name: /SOI/i });
        await expect(soiTab).toBeFocused();

        // Press Enter to activate SOI tab
        await page.keyboard.press('Enter');
        await expect(soiTab).toHaveAttribute('aria-selected', 'true');
        await expect(page.locator('.soi-tab')).toBeVisible();

        // Press ArrowLeft to go back to TẠO
        await page.keyboard.press('ArrowLeft');
        await expect(taoTab).toBeFocused();
    });

    test('tabs have correct ARIA attributes', async ({ page }) => {
        const tablist = page.getByRole('tablist');
        await expect(tablist).toBeVisible();

        const tabs = page.getByRole('tab');
        await expect(tabs).toHaveCount(2);

        // Each tab should have aria-selected
        await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
        await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
    });
});
