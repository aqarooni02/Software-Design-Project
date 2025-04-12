// Import @testing-library/jest-dom to extend Jest with DOM matchers
require('@testing-library/jest-dom');

// Mock localStorage for testing
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn().mockImplementation(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true
});

// Mock alert for testing form validations
window.alert = jest.fn(); 