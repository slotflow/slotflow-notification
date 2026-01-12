import { KafkaPushController } from "./presentation/kafkaPush.controller";
import { KafkaInappController } from "./presentation/kafkaInapp.controller";
import { KafkaEmailConsumerController } from "./presentation/kafkaEmail.controller";
import { KafkaGoogleCalendarController } from "./presentation/kafkaGoogleCalendar.controller";
import { kafkaEmailConsumer, kafkaGoogleCalendarConsumer, kafkaInappNotificationConsumer, kafkaProducer, kafkaPushNotificationConsumer } from "./infrastructure/messaging";

const kafkaEmailController = new KafkaEmailConsumerController(kafkaEmailConsumer);
const kafkaPushController = new KafkaPushController(kafkaPushNotificationConsumer);
const kafkaInAppController = new KafkaInappController(kafkaInappNotificationConsumer);
const kafkaGoogleCalendarController = new KafkaGoogleCalendarController(kafkaGoogleCalendarConsumer);

export const InitKafkaControllers = async () => {
   
    await kafkaEmailConsumer.connectConsumer();
    await kafkaInappNotificationConsumer.connectConsumer();
    await kafkaPushNotificationConsumer.connectConsumer();
    await kafkaGoogleCalendarConsumer.connectConsumer();

    await kafkaProducer.connectProducer();

    await kafkaEmailController.startListening();
    await kafkaInAppController.startListening();
    await kafkaPushController.startListening();
    await kafkaGoogleCalendarController.startListening();
};