import { test as base } from '@playwright/test';
import { HomeSteps } from '../../src/steps/HomeSteps';

type TestFixtures = {
  homeSteps: HomeSteps;
};

export const test = base.extend<TestFixtures>({
  homeSteps: async ({ page }, use) => {
    const homeSteps = new HomeSteps(page);
    await use(homeSteps);
  },
});

export { expect } from '@playwright/test';