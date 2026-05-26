import { kafkaEmailController } from "../../presentation/kafka/kafkaEmail.controller";
import { kafkaNotificationController } from "../../presentation/kafka/kafkaNotification.controller";
import { kafkaGoogleCalendarController } from "../../presentation/kafka/kafkaGoogleCalendar.controller";
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