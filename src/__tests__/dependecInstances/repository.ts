import { vi } from 'vitest';

export const mockNotificationRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    findByUserId: vi.fn(),
    markAsRead: vi.fn(),
};

export const mockUserDeviceRepository = {
    findByUserId: vi.fn(),
    create: vi.fn(),
    deleteByDeviceId: vi.fn(),
};