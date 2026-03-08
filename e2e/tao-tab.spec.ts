import { test, expect } from '@playwright/test';

test.describe('TẠO Tab — Excuse Generator Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('page loads with TẠO tab active and title visible', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Ú Òa');
        const taoTab = page.getByRole('tab', { name: /TẠO/i });
        await expect(taoTab).toHaveAttribute('aria-selected', 'true');
    });

    test('SituationPicker opens dropdown and selects an option', async ({ page }) => {
        const trigger = page.locator('.situation-picker__trigger');
        await trigger.click();

        const listbox = page.getByRole('listbox', { name: /tình huống/i });
        await expect(listbox).toBeVisible();

        const options = page.getByRole('option');
        const secondOption = options.nth(1);
        const secondText = await secondOption.textContent();
        await secondOption.click();

        await expect(listbox).not.toBeVisible();
        const triggerText = await trigger.textContent();
        expect(triggerText).toContain(secondText?.trim().slice(2));
    });

    test('RecipientPicker switches between pill options', async ({ page }) => {
        const pills = page.getByRole('radio');
        const count = await pills.count();
        expect(count).toBeGreaterThanOrEqual(2);

        await expect(pills.first()).toHaveAttribute('aria-checked', 'true');

        await pills.nth(1).click();
        await expect(pills.nth(1)).toHaveAttribute('aria-checked', 'true');
        await expect(pills.first()).toHaveAttribute('aria-checked', 'false');
    });

    test('ToneSlider changes tone level', async ({ page }) => {
        const slider = page.getByRole('slider', { name: /mức độ xạo/i });
        await expect(slider).toBeVisible();
        await expect(slider).toHaveAttribute('aria-valuenow', '3');

        await slider.fill('5');
        await expect(slider).toHaveAttribute('aria-valuenow', '5');
    });

    test('Generate button creates excuse text', async ({ page }) => {
        const generateBtn = page.getByRole('button', { name: /tạo excuse/i });
        await expect(generateBtn).toBeVisible();
        await generateBtn.click();

        const result = page.locator('.excuse-result__text');
        await expect(result).toBeVisible();
        const text = await result.textContent();
        expect(text!.length).toBeGreaterThan(5);
    });

    test('Copy button copies text and shows toast', async ({ page }) => {
        await page.getByRole('button', { name: /tạo excuse/i }).click();
        await expect(page.locator('.excuse-result__text')).toBeVisible();

        const copyBtn = page.getByRole('button', { name: /copy/i });
        await copyBtn.click();

        // Wait for async clipboard operation
        await expect(copyBtn).toContainText('Đã copy', { timeout: 5000 });
        await expect(page.getByText('Đã copy! 📋')).toBeVisible({ timeout: 5000 });
    });

    test('Regenerate button is functional', async ({ page }) => {
        await page.getByRole('button', { name: /tạo excuse/i }).click();
        const result = page.locator('.excuse-result__text');
        await expect(result).toBeVisible();

        // Regenerate button should exist and produce a result
        const regenBtn = page.getByRole('button', { name: /tạo lại/i });
        await expect(regenBtn).toBeVisible();
        await regenBtn.click();

        // Result should still be shown after regenerate
        await expect(result).toBeVisible();
        const text = await result.textContent();
        expect(text!.length).toBeGreaterThan(5);
    });

    test('RecipientPicker supports keyboard arrow navigation', async ({ page }) => {
        const pills = page.getByRole('radio');

        // Focus the first (active) pill
        await pills.first().focus();
        await expect(pills.first()).toHaveAttribute('aria-checked', 'true');

        // Press ArrowRight to move to second pill
        await page.keyboard.press('ArrowRight');
        await expect(pills.nth(1)).toHaveAttribute('aria-checked', 'true');
        await expect(pills.nth(1)).toBeFocused();

        // Press ArrowLeft to go back
        await page.keyboard.press('ArrowLeft');
        await expect(pills.first()).toHaveAttribute('aria-checked', 'true');
        await expect(pills.first()).toBeFocused();
    });

    test('Regenerate can produce a different excuse (no-repeat)', async ({ page }) => {
        await page.getByRole('button', { name: /tạo excuse/i }).click();
        const result = page.locator('.excuse-result__text');
        await expect(result).toBeVisible();
        const firstText = await result.textContent();

        // Try regenerating up to 5 times to find a different result
        let gotDifferent = false;
        for (let i = 0; i < 5; i++) {
            await page.getByRole('button', { name: /tạo lại/i }).click();
            const newText = await result.textContent();
            if (newText !== firstText) {
                gotDifferent = true;
                break;
            }
        }
        expect(gotDifferent).toBe(true);
    });
});

