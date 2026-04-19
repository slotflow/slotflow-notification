import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPushNotificationService } from '../../dependecInstances/service';
import { SendNotificationRequest } from '../../../application/dtos/common.dtos';
import { mockNotificationRepository, mockUserDeviceRepository } from '../../dependecInstances/repository';
import { SendNotificationUseCase } from '../../../application/useCases/notification/sendNotification.useCase';

describe('SendNotificationUseCase', () => {
    let useCase: SendNotificationUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        
        useCase = new SendNotificationUseCase(
            mockNotificationRepository as any,
            mockPushNotificationService as any,
            mockUserDeviceRepository as any
        );
    });

    it('should successfully create an in-app notification', async () => {
        const payload: SendNotificationRequest = {
            userId: 'user_123',
            title: 'New Message',
            body: 'You have a new message.',
            pushNotification: false,
            data: { key: 'value' }
        };

        await useCase.execute(payload);

        expect(mockNotificationRepository.create).toHaveBeenCalled();
        expect(mockPushNotificationService.sendNotification).not.toHaveBeenCalled();
    });

    it('should send a push notification when pushNotification is true and user has devices', async () => {
        const payload: SendNotificationRequest = {
            userId: 'user_123',
            title: 'Urgent',
            body: 'Action required',
            pushNotification: true,
            data: {}
        };

        mockUserDeviceRepository.findByUserId.mockResolvedValue([
            { deviceId: 'token_1' }
        ]);

        await useCase.execute(payload);

        expect(mockNotificationRepository.create).toHaveBeenCalled();
        expect(mockUserDeviceRepository.findByUserId).toHaveBeenCalledWith('user_123');
        expect(mockPushNotificationService.sendNotification).toHaveBeenCalledWith(expect.objectContaining({
            tokens: ['token_1'],
            title: 'Urgent'
        }));
    });

    it('should not send push notification if user has no devices', async () => {
        const payload: SendNotificationRequest = {
            userId: 'user_123',
            title: 'Alert',
            body: 'Test',
            pushNotification: true,
            data: {}
        };

        mockUserDeviceRepository.findByUserId.mockResolvedValue(null);

        await useCase.execute(payload);

        expect(mockNotificationRepository.create).toHaveBeenCalled();
        expect(mockPushNotificationService.sendNotification).not.toHaveBeenCalled();
    });

    it('should throw and log error if creation fails', async () => {
        const payload: SendNotificationRequest = {
            userId: 'user_123',
            title: 'Fail',
            body: 'Fail',
            pushNotification: false,
            data: {}
        };

        mockNotificationRepository.create.mockRejectedValue(new Error('DB Fail'));

        await expect(useCase.execute(payload)).rejects.toThrow('DB Fail');
    });
});
