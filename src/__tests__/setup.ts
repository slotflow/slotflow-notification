import { vi } from 'vitest';
import { Validator } from '../shared/validator/validator';

// Mock Validator methods to prevent errors during module initialization in tests
vi.spyOn(Validator.prototype, 'requireEnv').mockImplementation((key: string) => {
    return process.env[key] || `mock_${key}`;
});

vi.spyOn(Validator.prototype, 'requireNumber').mockImplementation((key: string) => {
    const value = process.env[key];
    return value ? Number(value) : 0;
});
