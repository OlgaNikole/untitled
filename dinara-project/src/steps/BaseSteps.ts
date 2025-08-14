import { Page, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export abstract class BaseSteps {
  protected page: Page;
  protected basePage: BasePage;

  constructor(page: Page, basePage: BasePage) {
    this.page = page;
    this.basePage = basePage;
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.basePage.getTitle();
    expect(actualTitle).toBe(expectedTitle);
  }

  async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
    const currentUrl = await this.basePage.getCurrentUrl();
    if (typeof expectedUrl === 'string') {
      expect(currentUrl).toBe(expectedUrl);
    } else {
      expect(currentUrl).toMatch(expectedUrl);
    }
  }

  async verifyElementIsVisible(locator: any): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async verifyElementText(locator: any, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyElementContainsText(locator: any, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  async waitForPageLoad(): Promise<void> {
    await this.basePage.waitForPageLoad();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.basePage.takeScreenshot(name);
  }
}