import app from "./app";
import { log } from "./shared/logger/logger";
import { appConfig, kafkaConfig } from "./config/env";
import { KafkaClientAdapter } from "./infrastructure/messaging/kafkaClientAdapter";
import { KafkaConsumerController } from "./presentation/kafka.controller";

export const kafkaClient = new KafkaClientAdapter(
  kafkaConfig.clientId,
  kafkaConfig.groupId,
  kafkaConfig.brokers
);

export const producer = {
  publish: kafkaClient.publish.bind(kafkaClient),
};

const start = async () => {
  try {
    await kafkaClient.connectProducer();
    await kafkaClient.connectConsumer();

    const controller = new KafkaConsumerController(kafkaClient);
    await controller.startListening();

    app.listen(appConfig.port, () =>
      log.info(`Notification service running on ${appConfig.port}`)
    );
  } catch (error) {
    log.error("Startup failed", error as Error);
    process.exit(1);
  }
};

start();
