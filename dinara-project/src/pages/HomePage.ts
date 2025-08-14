import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly logo: Locator;
  private readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.logo = page.locator('[data-testid="logo"]');
    this.navigationMenu = page.locator('[data-testid="navigation-menu"]');
  }

  async searchFor(query: string): Promise<void> {
    await this.fillInput(this.searchInput, query);
    await this.clickElement(this.searchButton);
  }

  async clickLogo(): Promise<void> {
    await this.clickElement(this.logo);
  }

  async getSearchInputPlaceholder(): Promise<string> {
    return await this.searchInput.getAttribute('placeholder') || '';
  }

  async isNavigationMenuVisible(): Promise<boolean> {
    return await this.isElementVisible(this.navigationMenu);
  }

  get getSearchInput(): Locator {
    return this.searchInput;
  }

  get getSearchButton(): Locator {
    return this.searchButton;
  }

  get getLogo(): Locator {
    return this.logo;
  }

  get getNavigationMenu(): Locator {
    return this.navigationMenu;
  }
}