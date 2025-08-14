# Dinara Project - Playwright E2E Testing

A Playwright end-to-end testing framework using the Page Object Model (POM) pattern with TypeScript.

## Project Structure

```
dinara-project/
├── src/
│   ├── pages/           # Page Object Model classes
│   │   ├── BasePage.ts  # Base page class with common methods
│   │   └── HomePage.ts  # Example home page implementation
│   ├── steps/           # Step classes for test actions
│   │   ├── BaseSteps.ts # Base steps class with common assertions
│   │   └── HomeSteps.ts # Example home page steps
│   └── utils/           # Utility classes and helpers
│       ├── Logger.ts    # Logging utility
│       └── TestData.ts  # Test data management
├── tests/
│   ├── fixtures/        # Test fixtures and base test setup
│   │   └── test-base.ts # Extended test fixture with steps
│   └── specs/           # Test specifications
│       └── home.spec.ts # Example test file
├── config/              # Configuration files
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.js        # ESLint configuration
└── .prettierrc         # Prettier configuration
```

## Features

- **Page Object Model Pattern**: Organized, maintainable test structure
- **TypeScript Support**: Full type safety and IntelliSense
- **Base Classes**: Reusable BasePage and BaseSteps classes
- **Test Fixtures**: Custom test fixtures for dependency injection
- **Multi-browser Support**: Chrome, Firefox, Safari, and mobile browsers
- **Parallel Execution**: Fast test execution with parallel running
- **Rich Reporting**: HTML, JUnit, and JSON reports
- **Screenshots & Videos**: Automatic capture on test failures
- **Linting & Formatting**: ESLint and Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd dinara-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### Development Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
```

## Writing Tests

### Creating a New Page Object

1. Create a new page class in `src/pages/`:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page, '/login');
    this.usernameInput = page.locator('[data-testid="username"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }
}
```

### Creating Step Classes

2. Create corresponding step class in `src/steps/`:
```typescript
import { Page } from '@playwright/test';
import { BaseSteps } from './BaseSteps';
import { LoginPage } from '../pages/LoginPage';

export class LoginSteps extends BaseSteps {
  private loginPage: LoginPage;

  constructor(page: Page) {
    const loginPage = new LoginPage(page);
    super(page, loginPage);
    this.loginPage = loginPage;
  }

  async performLogin(username: string, password: string): Promise<void> {
    await this.loginPage.navigateTo();
    await this.loginPage.login(username, password);
  }
}
```

### Writing Tests

3. Create test files in `tests/specs/`:
```typescript
import { test, expect } from '../fixtures/test-base';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    const loginSteps = new LoginSteps(page);
    
    await test.step('Perform login', async () => {
      await loginSteps.performLogin('testuser', 'password123');
    });
    
    await test.step('Verify successful login', async () => {
      await loginSteps.verifyCurrentUrl('/dashboard');
    });
  });
});
```

## Configuration

### Environment Variables

Set environment variables in `.env` file:
```
TEST_ENV=DEV
BASE_URL=https://example.com
HEADLESS=true
```

### Playwright Configuration

Modify `playwright.config.ts` to customize:
- Base URL
- Browser settings
- Timeouts
- Reporters
- Test directory

## Best Practices

1. **Use Page Object Model**: Keep page elements and actions in page classes
2. **Step Classes**: Use step classes for complex test workflows
3. **Data-testid Attributes**: Use `data-testid` for reliable element selection
4. **Assertions in Steps**: Keep test assertions in step classes
5. **Test Organization**: Group related tests in describe blocks
6. **Error Handling**: Use try-catch blocks for error handling
7. **Screenshots**: Take screenshots for debugging failures

## Contributing

1. Follow TypeScript and ESLint rules
2. Write meaningful test descriptions
3. Use the established POM pattern
4. Add appropriate error handling
5. Update documentation for new features