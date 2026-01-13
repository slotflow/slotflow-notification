import { KafkaNotificationController } from "./presentation/kafkaInapp.controller";
import { KafkaEmailConsumerController } from "./presentation/kafkaEmail.controller";
import { KafkaGoogleCalendarController } from "./presentation/kafkaGoogleCalendar.controller";
import { kafkaEmailConsumer, kafkaGoogleCalendarConsumer, kafkaNotificationConsumer, kafkaProducer } from "./infrastructure/messaging";

const kafkaEmailController = new KafkaEmailConsumerController(kafkaEmailConsumer);
const kafkaNotificationController = new KafkaNotificationController(kafkaNotificationConsumer);
const kafkaGoogleCalendarController = new KafkaGoogleCalendarController(kafkaGoogleCalendarConsumer);

export const InitKafkaControllers = async () => {
   
    await kafkaEmailConsumer.connectConsumer();
    await kafkaNotificationConsumer.connectConsumer();
    await kafkaGoogleCalendarConsumer.connectConsumer();

    await kafkaProducer.connectProducer();

    await kafkaEmailController.startListening();
    await kafkaNotificationController.startListening();
    await kafkaGoogleCalendarController.startListening();
};