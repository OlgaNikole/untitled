import { test, expect } from '../fixtures/test-base';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ homeSteps }) => {
    await homeSteps.navigateToHomePage();
  });

  test('should display all main elements on home page', async ({ homeSteps }) => {
    await test.step('Verify home page elements are visible', async () => {
      await homeSteps.verifyHomePageElementsAreVisible();
    });
  });

  test('should allow user to perform search', async ({ homeSteps }) => {
    await test.step('Perform search with query', async () => {
      await homeSteps.performSearch('test query');
    });
  });

  test('should display correct page title', async ({ homeSteps }) => {
    await test.step('Verify page title', async () => {
      await homeSteps.verifyPageTitle('Example Domain');
    });
  });

  test('should allow clicking on logo', async ({ homeSteps }) => {
    await test.step('Click on logo', async () => {
      await homeSteps.clickHomePageLogo();
    });
  });

  test('should verify search input placeholder', async ({ homeSteps }) => {
    await test.step('Verify search input placeholder text', async () => {
      await homeSteps.verifySearchInputPlaceholder('Search...');
    });
  });
});