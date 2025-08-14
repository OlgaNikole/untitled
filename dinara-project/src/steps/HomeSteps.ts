import { Page, expect } from '@playwright/test';
import { BaseSteps } from './BaseSteps';
import { HomePage } from '../pages/HomePage';

export class HomeSteps extends BaseSteps {
  private homePage: HomePage;

  constructor(page: Page) {
    const homePage = new HomePage(page);
    super(page, homePage);
    this.homePage = homePage;
  }

  async navigateToHomePage(): Promise<void> {
    await this.homePage.navigateTo();
    await this.waitForPageLoad();
  }

  async performSearch(query: string): Promise<void> {
    await this.homePage.searchFor(query);
  }

  async verifySearchInputIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.homePage.getSearchInput);
  }

  async verifySearchButtonIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.homePage.getSearchButton);
  }

  async verifyLogoIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.homePage.getLogo);
  }

  async verifyNavigationMenuIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.homePage.getNavigationMenu);
  }

  async verifySearchInputPlaceholder(expectedPlaceholder: string): Promise<void> {
    const placeholder = await this.homePage.getSearchInputPlaceholder();
    expect(placeholder).toBe(expectedPlaceholder);
  }

  async clickHomePageLogo(): Promise<void> {
    await this.homePage.clickLogo();
  }

  async verifyHomePageElementsAreVisible(): Promise<void> {
    await this.verifySearchInputIsVisible();
    await this.verifySearchButtonIsVisible();
    await this.verifyLogoIsVisible();
    await this.verifyNavigationMenuIsVisible();
  }
}