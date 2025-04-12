const { execSync } = require('child_process');
const path = require('path');

// Get test path from command line args or use the default
const testPath = process.argv[2] || 'src/__tests__';

try {
  // Run Jest with the specified test path and config
  execSync(`npx jest --config=jest.config.cjs ${testPath} --colors`, { stdio: 'inherit' });
} catch (error) {
  // Jest will throw an error if tests fail, but we've already displayed the output
  process.exit(1);
} 