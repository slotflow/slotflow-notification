import { kafkaEmailController } from "../../presentation/kafkaController/kafkaEmail.controller";
import { kafkaNotificationController } from "../../presentation/kafkaController/kafkaNotification.controller";
import { kafkaGoogleCalendarController } from "../../presentation/kafkaController/kafkaGoogleCalendar.controller";
import { kafkaEmailConsumer, kafkaGoogleCalendarConsumer, kafkaNotificationConsumer, kafkaProducer } from "../../infrastructure/messaging";

export const initKafka = async () => {
    await kafkaEmailConsumer.connectConsumer();
    await kafkaNotificationConsumer.connectConsumer();
    await kafkaGoogleCalendarConsumer.connectConsumer();

    await kafkaProducer.connectProducer();

    await kafkaEmailController.startListening();
    await kafkaNotificationController.startListening();
    await kafkaGoogleCalendarController.startListening();
};


export const stopKafka = async () => {
    await kafkaEmailConsumer.disconnectConsumer();
    await kafkaNotificationConsumer.disconnectConsumer();
    await kafkaGoogleCalendarConsumer.disconnectConsumer();

    await kafkaProducer.disconnectProducer();
}